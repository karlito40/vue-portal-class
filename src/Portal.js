import Vue from 'vue';

const portalRenderer = {
  portals: {},
  
  add(el, withRender) {
    let id = el.dataset.vuePortal;
    if(!id) {
      el.dataset.vuePortal = id = Object.keys(this.portals).length;
    }

    if(!this.portals[id]) {
      this.portals[id] = [];
    }

    this.portals[id].push(withRender);

    return {
      id,
      dispose: renderTarget => {
        const index = this.portals[id].indexOf(renderTarget);
        if (index !== -1) {
          this.portals[id].splice(index, 1);
        }

        return this.portals[id];
      },
      render: h => {
        let components = [];
        for(let renderHandler of this.portals[id]) {
          let result = [renderHandler(h)];
          if(result) {
            components = [...components, ...result];
          }
        }

        return components;
      }
    };
  },
}

export default class Portal {
  constructor(source, externalRender) {
    this.source = source;
    this.externalRender = externalRender;
    
    const portalRoot = this.createRoot();
    this.renderer = portalRenderer.add(portalRoot, this.externalRender);
    this.attrs = {
      id: portalRoot.id,
      class: [...portalRoot.classList],
      'data-vue-portal': portalRoot.dataset.vuePortal
    };

    this.vue = new Vue({
      render: this.render.bind(this)
    }).$mount(portalRoot);
  }

  render(h) {
    const components = this.renderer.render(h);
    return h('div', { attrs: this.attrs }, [components])
  }

  update() {
    this.vue.$forceUpdate();
  }

  unmount() {
    const rendersLeft = this.currentPool.dispose(this.externalRender);
    if(!rendersLeft.length) {
      this.getRoot().remove();
      this.vue.$destroy();
    }
  }

  createRoot() {
    let portalRoot = this.source;
    if(typeof this.source === 'string') {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', this.source);
      document.body.appendChild(portalRoot)
    }

    return portalRoot;
  }

  getRoot() {
    return this.currentPool 
      ? document.querySelector(`[data-vue-portal="${this.currentPool.id}"]`)
      : null;
  }
}

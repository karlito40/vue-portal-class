import Vue from 'vue';

const portalPool = {
  portals: {},
  
  add(id, withRender) {
    if(!this.portals[id]) {
      this.portals[id] = [];
    }

    this.portals[id].push(withRender);

    return {
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
  constructor(elementId, externalRender) {
    this.elementId = elementId;
    this.externalRender = externalRender;
    const portalRoot = this.createRoot();

    this.currentPool = portalPool.add(elementId, this.externalRender);

    this.vue = new Vue({
      render: this.render.bind(this)
    }).$mount(portalRoot);
  }

  render(h) {
    const components = this.currentPool.render(h);

    return h('div', {
      attrs: {
        id: this.elementId
      }
    }, [components])
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
    let portalRoot = this.getRoot();
    if(!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', this.elementId);
      document.body.appendChild(portalRoot)
    }

    return portalRoot;
  }

  getRoot() {
    return document.getElementById(this.elementId);
  }
}

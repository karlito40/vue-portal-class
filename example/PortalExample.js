import Portal from '../src/Portal';
import { cloneVNode } from './VueHelper';
 
export default {
  name: 'PortalExample',
  props: {
    showPortal: {
      type: Boolean,
      default: false
    }
  },
 
  methods: {
    renderPortal(h) {
      if(!this.showPortal) {
        return null;
      }
      
      return cloneVNode(this.$slots.default, h);
    }
  },
  
  beforeMount() {
    // Portal will be attach to div#portal-root
    // If no node is found, Portal will create div#portal-root
    // at the end of document.body
    this.portal = new Portal('portal-root', this.renderPortal);

    // Or you may pass an element 
    /* 
      const root = document.createElement('div')
      root.setAttribute('id', 'fresh-root');
      document.body.append(root); // You may bind it to something else than body
      this.portal = new Portal(root, this.renderPortal);
    */
      
    // this.portal = new Portal(document.querySelector('.toto'), this.renderPortal);
  },
 
  destroyed() {
    // It will destroy the portal if no other components is using it
    this.portal.unmount();
  },
  
  render(h) {
    // Trigger the portal renderer
    this.portal.update();
 
    return h('div', 'I am rendering with the normal flow without portal');
  }
}
# Portals

Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

## Example 

``` javascript
import Portal from 'vue-portal-class';
import { cloneVNode } from './VueHelper';

export default {
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
  },

  destroyed() {
    // It will destroy the portal if no other components is using it
    this.portal.unmount();
  },
  
  render(h) {
    // Trigger the portal renderer
    this.portal.update();

    return h('div', 'Normal renderer');
  }
}
```


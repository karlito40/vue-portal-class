export function cloneVNode(vnodesOri, createElement) {
  const vnodes = (Array.isArray(vnodesOri)) ? vnodesOri : [vnodesOri];
  
  function clone(vnode) {
    const clonedChildren = vnode && vnode.children && vnode
        .children
        .map(vnode => clone(vnode));
        
    const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
    cloned.text = vnode.text;
    cloned.isComment = vnode.isComment;
    cloned.componentOptions = vnode.componentOptions;
    cloned.elm = vnode.elm;
    cloned.context = vnode.context;
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    return cloned;
  }
  
  const clonedVNodes = vnodes.map(vnode => clone(vnode))
  return clonedVNodes;
}
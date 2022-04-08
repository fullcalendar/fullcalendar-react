import * as react from 'react'
import * as reactDom from 'react-dom'
import * as reactDomClient from 'react-dom/client'

/*
For internal FullCalendar testing.
The vdom.ts file is always used for built usage.
*/

const rootMap = new WeakMap()

function render(vdomNode: any, el: any): any {
  const existingRoot = rootMap.get(el)
  if (existingRoot) {
    existingRoot.render(vdomNode)
  } else {
    const root = reactDomClient.createRoot(el)
    root.render(vdomNode)
    rootMap.set(el, root)
  }
}

function unmountComponentAtNode(el: any) {
  let root = rootMap.get(el)
  if (root) {
    root.unmount()
    rootMap.delete(el)
  }
}

(typeof globalThis !== 'undefined' ? globalThis : window).FullCalendarVDom = { // TODO: streamline when killing IE11 support
  Component: react.Component,
  createElement: react.createElement,
  render,
  createRef: react.createRef,
  Fragment: react.Fragment,
  createContext: react.createContext,
  createPortal: reactDom.createPortal,
  flushSync: reactDom.flushSync,
  unmountComponentAtNode
}

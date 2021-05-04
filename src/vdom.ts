import * as react from 'react'
import * as reactDom from 'react-dom'

import ReactJSX = JSX // our reference to the JSX namespace

export type ReactComponentChild = react.ReactNode
  | object
  | string
  | number
  | boolean
  | null
  | undefined

declare global {
  namespace FullCalendarVDom {
    export import Ref = react.Ref
    export import RefObject = react.RefObject
    export import ComponentType = react.ComponentType
    export import VNode = react.ReactNode
    export import Context = react.Context
    export import Component = react.Component
    export type ComponentChild = ReactComponentChild
    export type ComponentChildren = ReactComponentChild | ReactComponentChild[]
    export import createElement = react.createElement
    export import render = reactDom.render
    export import createRef = react.createRef
    export import Fragment = react.Fragment
    export import createContext = react.createContext
    export import createPortal = reactDom.createPortal
    export type VUIEvent = react.UIEvent
    export function flushToDom(): void
    export function unmountComponentAtNode(node: HTMLElement): void
  }
  namespace createElement {
    export import JSX = ReactJSX // preact exports the h.JSX namespace whereas react has it global. use preact's technique
  }
}

(typeof globalThis !== 'undefined' ? globalThis : window).FullCalendarVDom = { // TODO: streamline when killing IE11 support
  Component: react.Component,
  createElement: react.createElement,
  render: reactDom.render,
  createRef: react.createRef,
  Fragment: react.Fragment,
  createContext: react.createContext,
  createPortal: reactDom.createPortal,
  flushToDom,
  unmountComponentAtNode: reactDom.unmountComponentAtNode
}

export function flushToDom() {
  // always sync from top-level
}

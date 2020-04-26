import * as react from 'react'
import * as reactDom from 'react-dom'

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
    export import Component = react.Component
    export type ComponentChild = ReactComponentChild
    export type ComponentChildren = ReactComponentChild | ReactComponentChild[];
    export import h = react.createElement
    export import render = reactDom.render
    export import createRef = react.createRef
    export import Fragment = react.Fragment
    export import createContext = react.createContext
    export type VUIEvent = react.UIEvent
  }
}

window.FullCalendarVDom = {
  Component: react.Component,
  h: react.createElement,
  render: reactDom.render,
  createRef: react.createRef,
  Fragment: react.Fragment,
  createContext: react.createContext
}

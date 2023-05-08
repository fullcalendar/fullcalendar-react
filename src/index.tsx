/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component, createRef, PureComponent } from 'react'
import { createPortal, flushSync } from 'react-dom'
import {
  CalendarOptions,
  CalendarApi,
  Calendar,
} from '@fullcalendar/core'
import {
  CustomRendering,
  CustomRenderingStore,
} from '@fullcalendar/core/internal'

interface CalendarState {
  customRenderingMap: Map<string, CustomRendering<any>>
}

export default class FullCalendar extends Component<CalendarOptions, CalendarState> {
  static act = runNow // DEPRECATED. Not leveraged anymore

  private elRef = createRef<HTMLDivElement>()
  private calendar: Calendar
  private handleCustomRendering: (customRendering: CustomRendering<any>) => void
  private resizeId: number | undefined
  private isUnmounting = false

  state: CalendarState = {
    customRenderingMap: new Map<string, CustomRendering<any>>()
  }

  render() {
    const customRenderingNodes: JSX.Element[] = []

    for (const customRendering of this.state.customRenderingMap.values()) {
      customRenderingNodes.push(
        <CustomRenderingComponent
          key={customRendering.id}
          customRendering={customRendering}
        />
      )
    }

    return (
      <div ref={this.elRef}>
        {customRenderingNodes}
      </div>
    )
  }

  componentDidMount() {
    const customRenderingStore = new CustomRenderingStore<unknown>()
    this.handleCustomRendering = customRenderingStore.handle.bind(customRenderingStore)

    this.calendar = new Calendar(this.elRef.current, {
      ...this.props,
      handleCustomRendering: this.handleCustomRendering,
    })
    this.calendar.render()

    let lastRequestTimestamp: number | undefined

    customRenderingStore.subscribe((customRenderingMap) => {
      const requestTimestamp = Date.now()
      const isMounting = !lastRequestTimestamp
      const runFunc = (
        this.isUnmounting ||
        isMounting ||
        (requestTimestamp - lastRequestTimestamp) < 100 // rerendering frequently
      ) ? runNow // either sync rendering (first-time or React 17) or async (React 18)
        : flushSync // guaranteed sync rendering

      runFunc(() => {
        this.setState({ customRenderingMap }, () => {
          lastRequestTimestamp = requestTimestamp
          if (isMounting) {
            this.doResize()
          } else {
            this.requestResize()
          }
        })
      })
    })
  }

  componentDidUpdate() {
    this.calendar.resetOptions({
      ...this.props,
      handleCustomRendering: this.handleCustomRendering,
    })
  }

  componentWillUnmount() {
    this.isUnmounting = true
    this.cancelResize()
    this.calendar.destroy()
  }

  requestResize = () => {
    if (!this.isUnmounting) {
      this.cancelResize()
      this.resizeId = requestAnimationFrame(() => {
        this.doResize()
      })
    }
  }

  doResize() {
    this.calendar.updateSize()
  }

  cancelResize() {
    if (this.resizeId !== undefined) {
      cancelAnimationFrame(this.resizeId)
      this.resizeId = undefined
    }
  }

  getApi(): CalendarApi {
    return this.calendar
  }
}

// Custom Rendering
// -------------------------------------------------------------------------------------------------

interface CustomRenderingComponentProps {
  customRendering: CustomRendering<any>
}

class CustomRenderingComponent extends PureComponent<CustomRenderingComponentProps> {
  render() {
    const { customRendering } = this.props
    const { generatorMeta } = customRendering
    const vnode = typeof generatorMeta === 'function' ?
      generatorMeta(customRendering.renderProps) :
      generatorMeta

    return createPortal(vnode, customRendering.containerEl)
  }
}

// Util
// -------------------------------------------------------------------------------------------------

function runNow(f: () => void): void {
  f()
}

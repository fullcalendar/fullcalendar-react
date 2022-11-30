/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component, createRef, ReactPortal } from 'react'
import { createPortal } from 'react-dom'
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
  private elRef = createRef<HTMLDivElement>()
  private calendar: Calendar

  state: CalendarState = {
    customRenderingMap: new Map<string, CustomRendering<any>>()
  }

  render() {
    const portalNodes: ReactPortal[] = []

    for (const customRendering of this.state.customRenderingMap.values()) {
      const { generatorMeta } = customRendering
      const vnode = typeof generatorMeta === 'function' ?
        generatorMeta(customRendering.renderProps) :
        generatorMeta

      portalNodes.push(
        createPortal(
          vnode,
          customRendering.containerEl,
          customRendering.id, // key
        )
      )
    }

    return (
      <div ref={this.elRef}>
        {portalNodes}
      </div>
    )
  }

  componentDidMount() {
    const customRenderingStore = new CustomRenderingStore<unknown>()

    this.calendar = new Calendar(this.elRef.current, {
      ...this.props,
      handleCustomRendering: customRenderingStore.handle.bind(customRenderingStore),
      customRenderingMetaMap: this.props, // render functions are given as props
    })

    this.calendar.render()
    customRenderingStore.subscribe((customRenderingMap) => {
      this.setState({ customRenderingMap })
    })
  }

  componentDidUpdate(prevProps: CalendarOptions) {
    const updates = computeUpdates(prevProps, this.props)

    if (Object.keys(updates).length) {
      this.calendar.resetOptions(updates, true)
    }
  }

  componentWillUnmount() {
    this.calendar.destroy()
  }

  getApi(): CalendarApi {
    return this.calendar
  }
}

// Utils

function computeUpdates(origObj: any, newObj: any): any {
  const updates: any = {}

  if (newObj !== origObj) {
    for (const key in newObj) {
      if (newObj[key] !== origObj[key]) {
        updates[key] = newObj[key]
      }
    }
  }

  return updates
}

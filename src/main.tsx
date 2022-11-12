/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component, createRef } from 'react'
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
  customRenderings: Iterable<CustomRendering<unknown>>
}

export default class FullCalendar extends Component<CalendarOptions> {
  private elRef = createRef<HTMLDivElement>()
  private calendar: Calendar

  state: CalendarState = {
    customRenderings: []
  }

  render() {
    return (
      <div ref={this.elRef}>
        {Array.from(this.state.customRenderings).map((customRendering) => {
          return createPortal(
            customRendering.generatorMeta(customRendering.renderProps),
            customRendering.containerEl,
            customRendering.id, // key
          )
        })}
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
    customRenderingStore.subscribe((customRenderings) => {
      this.setState({ customRenderings })
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

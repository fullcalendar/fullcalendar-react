import React, { Component, createRef } from 'react'
import { createPortal } from 'react-dom'
import {
  CalendarOptions,
  CalendarApi,
  Calendar,
  CustomRendering,
  CustomRenderingStore,
} from '@fullcalendar/core'

interface CalendarState {
  customRenderings: Iterable<CustomRendering<unknown>>
}

export default class FullCalendar extends Component<CalendarOptions> {
  private elRef = createRef<HTMLDivElement>()
  private handleCustomRendering: (customRendering: CustomRendering<unknown>) => void
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

    this.handleCustomRendering = customRenderingStore.handle.bind(customRenderingStore)
    this.calendar = new Calendar(this.elRef.current, this.buildOptions())

    this.calendar.render()
    customRenderingStore.subscribe((customRenderings) => {
      this.setState({ customRenderings })
    })
  }

  componentDidUpdate() {
    this.calendar.resetOptions(this.buildOptions())
  }

  componentWillUnmount() {
    this.calendar.destroy()
  }

  getApi(): CalendarApi {
    return this.calendar
  }

  private buildOptions(): CalendarOptions {
    return {
      ...this.props,
      handleCustomRendering: this.handleCustomRendering,
      customRenderingMetaMap: this.props, // render functions are given as props
    }
  }
}

// export all important utils/types
export * from '@fullcalendar/core'

import React from 'react'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

import CalendarOptionsMapper from './calendarOptionsMapper'

class FullCalendar extends React.Component {
  constructor() {
    super()
    this.calendarOptionsMapper = new CalendarOptionsMapper()
    this.calendarRef = React.createRef()
    this.calendar = null
    this.date = new Date()
  }

  componentDidMount() {
    const calendarOptions = this.calendarOptionsMapper.getOptions(this.props)
    const calendarEl = this.calendarRef.current
    const passedPlugins = calendarOptions.plugins ? calendarOptions.plugins : []

    this.calendar = new Calendar(calendarEl, {
      ...calendarOptions,
      plugins: [ dayGridPlugin, ...passedPlugins ]
    })
    this.calendar.render()
  }

  componentWillReceiveProps(nextProps) {
    this.calendar.destroy()

    const calendarOptions = this.calendarOptionsMapper.getOptions(nextProps)
    const calendarEl = this.calendarRef.current
    const passedPlugins = calendarOptions.plugins ? calendarOptions.plugins : []

    this.calendar = new Calendar(calendarEl, {
      ...calendarOptions,
      plugins: [ dayGridPlugin, ...passedPlugins ]
    })
    this.calendar.render()
  }

  render() {
    return (
      <div ref={this.calendarRef}></div>
    )
  }
}

export default FullCalendar

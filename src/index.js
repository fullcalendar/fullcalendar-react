import React from 'react'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

import CalendarOptionsMapper from './calendarOptionsMapper'

class FullCalendar extends React.Component {
  constructor() {
    super()
    this.calendarOptionsMapper = new CalendarOptionsMapper()
    this.elRef = React.createRef()
    this.calendar = null
    this.date = new Date()
  }

  componentDidMount() {
    const calendarOptions = this.calendarOptionsMapper.getOptions(this.props)
    const passedPlugins = calendarOptions.plugins ? calendarOptions.plugins : []

    this.calendar = new Calendar(this.elRef.current, {
      ...calendarOptions,
      plugins: [ dayGridPlugin, ...passedPlugins ]
    })
    this.calendar.render()
  }

  componentWillReceiveProps(nextProps) {
    this.calendar.destroy()

    const calendarOptions = this.calendarOptionsMapper.getOptions(nextProps)
    const passedPlugins = calendarOptions.plugins ? calendarOptions.plugins : []

    this.calendar = new Calendar(this.elRef.current, {
      ...calendarOptions,
      plugins: [ dayGridPlugin, ...passedPlugins ]
    })
    this.calendar.render()
  }

  render() {
    return (
      <div ref={this.elRef}></div>
    )
  }
}

export default FullCalendar

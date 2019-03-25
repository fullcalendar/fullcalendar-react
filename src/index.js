import React from 'react'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

import CalendarOptionsMapper from './calendarOptionsMapper'

class FullCalendar extends React.Component {
  constructor() {
    super()
    this.calendarOptionsMapper = new CalendarOptionsMapper()
    this.root = null
    this.calendar = null
    this.date = new Date()
  }

  componentDidMount() {
    const calendarOptions = this.calendarOptionsMapper.getOptions(this.props)
    const calendarEl = document.getElementById(this.root)
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
    const calendarEl = document.getElementById(this.root)
    const passedPlugins = calendarOptions.plugins ? calendarOptions.plugins : []

    this.calendar = new Calendar(calendarEl, {
      ...calendarOptions,
      plugins: [ dayGridPlugin, ...passedPlugins ]
    })
    this.calendar.render()
  }

  render() {
    this.root = this.props.id || 'ID' + this.date.getTime()
    return (
      <div id={this.root}></div>
    )
  }
}

export default FullCalendar

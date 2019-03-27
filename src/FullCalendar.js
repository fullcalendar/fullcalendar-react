import React from 'react'
import { Calendar } from '@fullcalendar/core'

class FullCalendar extends React.Component {
  constructor() {
    super()
    this.elRef = React.createRef()
    this.calendar = null
  }

  componentDidMount() {
    this.calendar = new Calendar(this.elRef.current, {
      ...this.props
    })
    this.calendar.render()
  }

  componentWillReceiveProps(nextProps) {
    this.calendar.destroy()

    this.calendar = new Calendar(this.elRef.current, {
      ...this.props
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

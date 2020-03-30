import * as React from 'react'
import { Calendar, OptionsInput } from '@fullcalendar/core'
import { diffProps } from './utils'


export default class FullCalendar extends React.Component<OptionsInput, any> {

  private elRef: any = React.createRef()
  private calendar: Calendar

  render() {
    return (
      <div ref={this.elRef}></div>
    )
  }

  componentDidMount() {
    this.calendar = new Calendar(this.elRef.current, this.props)
    this.calendar.render()
  }

  componentDidUpdate(oldProps) {
    let diff = diffProps(oldProps, this.props)
    this.calendar.mutateOptions(diff.updates, diff.removals)
  }

  componentWillUnmount() {
    this.calendar.destroy()
  }

  getApi(): Calendar {
    return this.calendar
  }

}

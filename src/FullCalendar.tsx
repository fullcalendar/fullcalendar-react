import deepEquals from 'fast-deep-equal'
import * as React from 'react'
import { Calendar, OptionsInput } from '@fullcalendar/core'

/*
TODO: note about deepEquals performance
*/

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
    let { props } = this
    let updates = {}
    let removals = []

    for (let propName in oldProps) {
      if (!(propName in props)) {
        removals.push(propName)
      }
    }

    for (let propName in props) {
      if (!deepEquals(props[propName], oldProps[propName])) {
        updates[propName] = props[propName]
      }
    }

    this.calendar.mutateOptions(updates, removals, false, deepEquals)
  }

  componentWillUnmount() {
    this.calendar.destroy()
  }

  getApi(): Calendar {
    return this.calendar
  }

}

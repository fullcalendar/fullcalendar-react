import deepEqual from 'fast-deep-equal'
import * as React from 'react'
import { Calendar, OptionsInput } from '@fullcalendar/core'


export default class FullCalendar extends React.Component<OptionsInput, any> {

  private elRef: any = React.createRef()
  private calendar: Calendar

  render() {
    return (
      <div ref={this.elRef}></div>
    )
  }

  componentDidMount() {
    const { props } = this
    const { events }: any = props
    this.calendar = new Calendar(this.elRef.current,props)
    for (const propName in props) {
      if (propName === 'events') {
        this.calendar.batchRendering(() => {
          this.calendar.removeAllEvents()
          events.map(event => this.calendar.addEvent(event))
          this.calendar.render()
        })
      }
    }
  }

  componentDidUpdate(oldProps) {
    let { props } = this
    const { events }: any = props
    let updates = {}
    let removals = []
    for (let propName in oldProps) {
      if (!(propName in props)) {
        removals.push(propName)
      }
    }

    /*
    Do a deep-comparison for prop changes. We do this because often times the parent component will pass in
    an object literal that generates a new reference every time its render() function runs.
    This isn't too much of a performance hit because normally these object literals are rather small.
    For larger data, the parent component will almost definitely generate a new reference on every mutation,
    because immutable prop data is the norm in React-world, making the deepEqual function execute really fast.
    */
    for (const propName in props) {
      if (propName === 'events') {
        this.calendar.batchRendering(() => {
          this.calendar.removeAllEvents()
          events.map(event => this.calendar.addEvent(event))
        })
      } else if (!deepEqual(props[propName], oldProps[propName])) {
        updates[propName] = props[propName]
      }
    }

    this.calendar.mutateOptions(updates, removals, false, deepEqual)
  }

  componentWillUnmount() {
    this.calendar.destroy()
  }

  getApi(): Calendar {
    return this.calendar
  }

}

import './vdom'
import * as React from 'react'
import {
  OptionsInput,
  CalendarApi, CalendarDataProvider,
  CalendarContent, computeCalendarHeight, computeCalendarClassNames
} from '@fullcalendar/common'


export default class FullCalendar extends React.Component<OptionsInput, any> {

  private _calendarApi = new CalendarApi()


  render() {
    return (
      <CalendarDataProvider optionOverrides={this.props} calendarApi={this._calendarApi}>
        {(data) => (
          <div className={computeCalendarClassNames(data).join(' ')} style={{ height: computeCalendarHeight(data) }}>
            <CalendarContent {...data} />
          </div>
        )}
      </CalendarDataProvider>
    )
  }


  getApi(): CalendarApi {
    return this._calendarApi
  }

}

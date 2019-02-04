# sardius-fullcalendar-wrapper

A react wrapper component for jquery-free version 4.0 of [FullCalendar](https://fullcalendar.io/) (a customizable javascript event calendar). 
(Note: FullCalendar 4.0 is still in alpha - using version 4.0.0-alpha.4)

Fork off of https://www.npmjs.com/package/fullcalendar-reactwrapper

Full Calendar [v4 release notes](https://fullcalendar.io/docs/v4/release-notes).

Full Calendar [v4 docs](https://fullcalendar.io/docs/v4#toc).

## Table of contents
1. [Installation](#installation)
2. [Basic usage](#basic-usage)
3. [rrule Plugin](#rrule-plugin)
4. [License](#license)


## Installation 

`npm install sardius-fullcalendar-wrapper --save`

Include `sardius-fullcalendar-wrapper/dist/fullcalendar.min.css` for styles.

## Basic usage

`sardius-fullcalendar-wrapper` creates a `<FullCalendar/>` component. You can use it just like any other React component. For example:
 
```jsx
// import React...
import React from 'react';
import ReactDOM from 'react-dom';

// ... and sardius-fullcalendar-wrapper.
import FullCalendar from 'sardius-fullcalendar-wrapper';

// ... and Calendar CSS
import 'sardius-fullcalendar-wrapper/dist/fullcalendar.min.css';

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    // Create a reference to the component to use Full Calendar methods
    this.fullCalendar = React.createRef();
    this.state = {
      events:[
        {
          title: 'All Day Event',
          start: '2018-12-01'
        },
        {
          title: 'Long Event',
          start: '2018-12-07',
          end: '2018-12-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-12-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-12-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-12-11',
          end: '2018-12-13'
        },
        {
          title: 'Click for Google Url Event',
          url: 'http://google.com/',
          start: '2017-12-28'
        }
      ],		
    }
  };

  eventClicked = (eventClickInfo) => {
    alert('Event has been clicked!');
  }

  getView = () => {
    // Use reference to call Full Calendar Methods
    const view = this.fullCalendar.current.calendar.getView();
    alert('We are using FullCalendar Methods!');
  }

  selectEvent = (selectionInfo) => {
    alert('Event Selected!');
  }

  render() {
    return (
      <div id="example-component">
        <FullCalendar
          ref={this.fullCalendar} // Add ref defined in constructor to FullCalendar
          id = "your-custom-calendar-ID"
          header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          }}
          defaultDate='2018-12-05'
          // Example of an option set to false
          navLinks={false}
          // Example of an option set to true
          editable
          selectable
          selectHelper
          // Example of a callback / handler function
          select={selectionInfo => {
            this.selectEvent(selectionInfo);
          }}
          // Another example of a callback / handler function
          eventClick={eventClickInfo => {
            this.eventClicked(eventClickInfo);
          }}
          // Load in this calendar's events
          events = {this.state.events} 
        />
      </div>
    );
  }
}

ReactDOM.render(<ExampleComponent />, document.getElementById('root'));
```

The `id` property declares the `id` of the root element for the FullCalendar component. 
If it isn't provided, the FullCalendar component will get a random generated `id`.

## rrule Plugin

sardius-fullcalendar-wrapper includes FullCalendar's built in rrule plugin. 
The RRule plugin is a connector to the rrule js library. It is powerful for specifying recurring events.

The rrule property accepts whatever the rrule lib accepts for a new RRule. 
[See the docs](https://github.com/jakubroztocil/rrule). 

You can specify a string or an object in your event object. As shown in the example below.

```jsx

class EventUsingRRULE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          // standard property
          title: 'my recurring event',

          // rrule property
          rrule: 'DTSTART:20120201T103000Z\nRRULE:FREQ=WEEKLY;INTERVAL=5;UNTIL=20120601;BYDAY=MO,FR',
          // ...or, an object...
          rrule: {
            freq: 'weekly',
            interval: 5,
            byweekday: [ 'mo', 'fr' ],
            dtstart: '2012-02-01T10:30:00',
            until: '2012-06-01'
          },

          // for specifying the end time of each instance
          duration: '02:00'
        },
      ],
    };

    ...
```

## License 
* MIT

## Dependencies

* fullcalendar

## Peer dependencies 

* react
* react-dom

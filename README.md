# sardius-fullcalendar-wrapper

A react wrapper component for easy `react` integration of Full Calendar 4.0 of [FullCalendar](https://fullcalendar.io/) (a customizable javascript event calendar). 

Full Calendar 4.0 has been officially released: [v4 release notes](https://fullcalendar.io/blog/2019/03/v4-officially-released).

Full Calendar [v4 docs](https://fullcalendar.io/docs#toc).

`sardius-fullcalendar-wrapper` [Demo](https://sardiusmedia.github.io/sardius-fullcalendar-wrapper/).

## Table of contents
1. [Installation](#installation)
2. [Basic usage](#basic-usage)
3. [Plugins](#plugins)
4. [License](#license)


## Installation 

`npm install sardius-fullcalendar-wrapper --save`

`npm install ...any used @fullcalendar plugins ie. @fullcalendar/interaction`

## Basic usage

`sardius-fullcalendar-wrapper` creates a `<FullCalendar />` component. You can use it just like any other React component. For example:
 
```jsx
// import React...
import React from 'react';
import ReactDOM from 'react-dom';

// ... and sardius-fullcalendar-wrapper.
import FullCalendar from 'sardius-fullcalendar-wrapper';

// ... and any fullcalendar plugins you may require
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

// ... and any fullcalendar specific css
import '@fullcalendar/timegrid/main.css';

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
          start: Date.now(),
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
          defaultView="timeGrid" // Uses the timeGridPlugin
          defaultDate='2018-12-05'
          // Example of an option set to false (only required if the default is true)
          navLinks={false}
          // Example of an option set to true
          editable
          selectable // Uses the interactionPlugin
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
          events={this.state.events} 
          // Add in required plugins for the options that you selected above
          plugins={[
            interactionPlugin,
            timeGridPlugin
          ]}
        />
      </div>
    );
  }
}

ReactDOM.render(<ExampleComponent />, document.getElementById('root'));
```

The `id` property declares the `id` of the root element for the FullCalendar component. 
If it isn't provided, the FullCalendar component will get a random generated `id`.

### Plugins

By default the @fullcalendar/core and the @fullcalendar/daygrid plugins 
come already included in the **sardius-fullcalendar-wrapper** package. 

FullCalendar offers the following packages:

Read More here: [Plugin Docs](https://fullcalendar.io/docs/plugin-index).

| Plugin | README |
| ------ | ------ |
| @fullcalendar/core | Offers the Calendar class among other things. |
| @fullcalendar/interaction | Required to detect dateClick actions, selectable actions, and event drag-n-drop & resizing. Not needed for eventClick or eventMouseEnter/eventMouseLeave.|
| @fullcalendar/daygrid | Offers Month and DayGrid views: dayGridMonth, dayGridWeek, dayGridDay, dayGrid (generic) |
| @fullcalendar/timegrid | Offers TimeGrid views: timeGridWeek, timeGridDay, timeGrid (generic) |
| @fullcalendar/list | Offers Lists views: listYear, listMonth, listWeek, listDay, list (generic) |
| @fullcalendar/timeline | Offers Timeline views with no resource support: timelineYear, timelineMonth, timelineWeek, timelineDay, timeline (generic)|
| @fullcalendar/resource-common | Offers base support for resources. Required for all resource-related plugins. |
| @fullcalendar/resource-daygrid | Offers resource-enabled DayGrid views: resourceDayGridMonth, resourceDayGridWeek, resourceDayGridDay resourceDayGrid (generic) |
| @fullcalendar/resource-timegrid | Offers resource-enabled TimeGrid views: resourceTimeGridWeek, resourceTimeGridDay, resourceTimeGrid (generic) |
| @fullcalendar/resource-timeline | Offers resource-enabled Timeline views: resourceTimelineYear, resourceTimelineMonth, resourceTimelineWeek, resourceTimelineDay, resourceTimeline (generic) |
| @fullcalendar/bootstrap | Offers Bootstrap theming |
| @fullcalendar/google-calendar | For loading events from a public Google Calendar feed	 |
| @fullcalendar/rrule | For leveraging the RRule library for event recurrence |
| @fullcalendar/luxon | Offers a named-timezone implementation, a formatting string implementation, and utilities for converting to Luxon DateTimes. |
| @fullcalendar/moment | Offers a formatting string implementation and utilities fo convert to Moment objects. |
| @fullcalendar/moment-timezone | Offers a named timezone implementation. |

### View API
  By default you 

#### License 
* MIT

#### Dependencies

* @fullcalendar/core
* @fullcalendar/daygrid

#### Peer dependencies 

* react
* react-dom

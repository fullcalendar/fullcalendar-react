# sardius-fullcalendar-react 

A react wrapper component for jquery-free version 4.0 of [FullCalendar](https://fullcalendar.io/) (a customizable javascript event calendar).

Fork off of https://www.npmjs.com/package/fullcalendar-reactwrapper

Full Calendar [v4 release notes](https://fullcalendar.io/docs/v4/release-notes).

Full Calendar [v4 docs](https://fullcalendar.io/docs/v4#toc).

## Table of contents
1. [Installation](#installation)
2. [Basic usage](#basic-usage)
3. [License](#license)


## Installation 

`npm install sardius-fullcalendar-react --save`

Include `sardius-fullcalendar-react/dist/fullcalendar.min.css` for styles.

## Basic usage

`sardius-fullcalendar-react` creates a `<FullCalendar/>` component. You can use it just like any other React component. For example:
 
```jsx
// import React...
import React from 'react';
import ReactDOM from 'react-dom';

// ... and sardius-fullcalendar-react.
import FullCalendar from 'sardius-fullcalendar-react';

// ... and Calendar CSS
import 'sardius-fullcalendar-react/dist/fullcalendar.min.css';

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.fullCalendar = React.createRef(); // Create a reference to the component to use Full Calendar methods
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
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2017-12-28'
        }
      ],		
    }
  }

  eventClicked = (eventClickInfo) => {
    alert('Event has been clicked!');
  }

  getView = () => {
    const view = this.fullCalendar.current.calendar.getView(); // Use reference to call Full Calendar Methods
    alert('We are using FullCalendar Methods!');
  }

  selectEvent = (selectionInfo) => {
    alert('Event Selected!');
  }

  render() {
    return (
      <div id="example-component">
        <FullCalendar
          id = "your-custom-calendar-ID"
          header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          }}
          defaultDate='2018-12-'
          navLinks={false} // Example of an option set to false
          editable // Example of an option set to true
          selectable
          selectHelper
          select={selectionInfo => {
            this.selectEvent(selectionInfo); // Example of a callback / handler function
          }}
          eventClick={eventClickInfo => {
            this.eventClicked(eventClickInfo); // Another example of a callback / handler function
          }}
          events = {this.state.events} // Load in this calendar's events
        />
      </div>
    );
  }
}

ReactDOM.render(<ExampleComponent />, document.getElementById('root'));
```

The `id` property declares the `id` of the root element for the FullCalendar component. If it isn't provided, the FullCalendar component will get a random generated `id`.

## License 
* MIT

## Dependencies

* fullcalendar

## Peer dependencies 

* react
* react-dom

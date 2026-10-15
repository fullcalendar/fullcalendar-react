
# FullCalendar React Component

> [!IMPORTANT]
> **This repo shows FullCalendar v6. The current version is v7**, which is developed in [fullcalendar-workspace](https://github.com/fullcalendar/fullcalendar-workspace/tree/main/standard/packages/react) for now. This repo's code is lagging behind and will be updated.
>
> In v7, plugins like dayGrid and timeGrid are no longer separate packages. Run `npm install @fullcalendar/react temporal-polyfill` and import plugins from `@fullcalendar/react/daygrid`, etc. Don't install `@fullcalendar/core`, `@fullcalendar/daygrid` or the other v6 packages with v7. See the [v7 React docs](https://fullcalendar.io/docs/react).

The official [React](https://reactjs.org/) Component for [FullCalendar](https://fullcalendar.io)

## Installation

Install the React connector, the core package, and any plugins (like [daygrid](https://fullcalendar.io/docs/month-view)):

```sh
npm install @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid
```

## Usage

Render a `FullCalendar` component, supplying [options](https://fullcalendar.io/docs#toc) as props:

```jsx
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const events = [
  { title: 'Meeting', start: new Date() }
]

export function DemoApp() {
  return (
    <div>
      <h1>Demo App</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
```

## Links

- [Documentation](https://fullcalendar.io/docs/react)
- [Example Project](https://github.com/fullcalendar/fullcalendar-examples/tree/main/react)

## Development

You must install this repo with [PNPM](https://pnpm.io/):

```
pnpm install
```

Available scripts (via `pnpm run <script>`):

- `build` - build production-ready dist files
- `dev` - build & watch development dist files
- `test` - test headlessly
- `test:dev` - test interactively
- `lint`
- `clean`

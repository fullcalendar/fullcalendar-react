import React from 'react'
import { render } from 'react-testing-library'

import daygridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '../dist/main.esm' // must run build/watch beforehand

import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

const PLUGINS = [ daygridPlugin ]
const NOW_DATE = new Date()


it('should render without crashing', () => {
  const { container } = render(<FullCalendar plugins={PLUGINS} />)
  expect(getHeaderToolbarEl(container)).toBeTruthy()
})

it('should unmount and destroy', () => {
  let destroyedCalled = false
  const destroyed = () => { destroyedCalled = true }
  const { unmount } = render(<FullCalendar plugins={PLUGINS} _destroyed={destroyed} />)

  unmount()
  expect(destroyedCalled).toBe(true)
})

it('should have updatable props', () => {
  const { container, rerender } = render(<FullCalendar plugins={PLUGINS} />)
  expect(isWeekendsRendered(container)).toBe(true)

  rerender(<FullCalendar weekends={false} plugins={PLUGINS} />)
  expect(isWeekendsRendered(container)).toBe(false)
})

it('should accept a callback', () => {
  let called = false
  const callback = () => { called = true }
  render(<FullCalendar viewDidMount={callback} plugins={PLUGINS}/>)
  expect(called).toBe(true)
})

it('should expose an API', function() {
  let componentRef = React.createRef()
  render(<FullCalendar ref={componentRef} plugins={PLUGINS} />)
  let calendarApi = componentRef.current.getApi()
  expect(calendarApi).toBeTruthy()

  let newDate = new Date(Date.UTC(2000, 0, 1))
  calendarApi.gotoDate(newDate)
  expect(calendarApi.getDate().valueOf()).toBe(newDate.valueOf())
})

it('won\'t rerender toolbar if didn\'t change', function() {
  const { container, rerender } = render(
    <FullCalendar plugins={PLUGINS} header={buildToolbar()} />
  )
  let headerEl = getHeaderToolbarEl(container)

  rerender(
    <FullCalendar plugins={PLUGINS} header={buildToolbar()} />
  )
  expect(getHeaderToolbarEl(container)).toBe(headerEl)
})

it('won\'t rerender events if didn\'t change', function() {
  const { container, rerender } = render(
    <FullCalendar plugins={PLUGINS} events={[ buildEvent() ]} />
  )
  let eventEl = getFirstEventEl(container)

  rerender(
    <FullCalendar plugins={PLUGINS} events={[ buildEvent() ]} />
  )
  expect(getFirstEventEl(container)).toBe(eventEl)
})


// FullCalendar data utils

function buildToolbar() {
  return {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  }
}

function buildEvent() {
  return { title: 'event', start: new Date(NOW_DATE.valueOf()) } // consistent datetime
}


// DOM utils

function getHeaderToolbarEl(container) {
  return container.querySelector('.fc-header-toolbar')
}

function isWeekendsRendered(container) {
  return Boolean(container.querySelector('.fc-day-sat'))
}

function getFirstEventEl(container) {
  return container.querySelector('.fc-event')
}

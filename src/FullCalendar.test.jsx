import React from 'react'
import { render } from 'react-testing-library'

import daygridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '../dist/main.esm' // must run build/watch beforehand

import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

const PLUGINS = [ daygridPlugin ]

it('should render without crashing', () => {
  const { getByText } = render(<FullCalendar plugins={PLUGINS} />)
  const el = getByText('today')
  expect(el.classList[0]).toBe('fc-today-button')
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
  expect(container.querySelector('.fc-sat')).toBeTruthy()

  rerender(<FullCalendar weekends={false} plugins={PLUGINS} />)
  expect(container.querySelector('.fc-sat')).toBeFalsy()
})

it('should accept a callback', () => {
  let called = false
  const callback = () => { called = true }
  render(<FullCalendar viewSkeletonRender={callback} plugins={PLUGINS}/>)
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

import React from 'react'
import { render } from 'react-testing-library'

import daygridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '../dist/main.esm' // weird, but most realistic testing scenario

import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

describe('rendering', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<FullCalendar plugins={[ daygridPlugin ]} />)
    const el = getByText('today')
    expect(el.classList[0]).toBe('fc-today-button')
  })

  it('should unmount from the DOM', () => {
    const { unmount, queryByText } = render(<FullCalendar plugins={[ daygridPlugin ]} />)
    unmount()
    const el = queryByText('today')
    expect(el).toBeNull()
  })
})

describe('callbacks and prop changes', () => {
  it('should accept a callback', () => {
    let bool = false
    const callback = () => {
      bool = true
    }
    render(<FullCalendar viewSkeletonRender={callback} plugins={[ daygridPlugin ]}/>)
    expect(bool).toBeTruthy()
  })

  it('should have updatable props', () => {
    const calendarApiRef = React.createRef()
    render(<FullCalendar ref={calendarApiRef} plugins={[ daygridPlugin ]} />)
    let locale = calendarApiRef.current.calendar.getOption('locale')
    expect(locale).toBe('')

    calendarApiRef.current.calendar.setOption('locale', 'fr')
    locale = calendarApiRef.current.calendar.getOption('locale')
    expect(locale).toBe('fr')
  })
})

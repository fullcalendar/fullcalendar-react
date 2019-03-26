/* eslint-disable */
import React from 'react'
import { render } from 'react-testing-library'

import FullCalendar from '../index'

describe('rendering', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<FullCalendar />)
    const el = getByText('today')
    expect(el.classList[0]).toBe('fc-today-button')
  })

  it('should unmount from the DOM', () => {
    const { unmount, queryByText } = render(<FullCalendar />)
    unmount()
    const el = queryByText('today')
    expect(el).toBeNull()
  });
})

describe('callbacks and prop changes', () => {
  it('should accept a callback', () => {
    let bool = false
    const callback = () => {
      bool = true;
    }
    render(<FullCalendar  viewSkeletonRender={callback}/>)
    expect(bool).toBeTruthy()
  })

  it('should have updatable props', () => {
     const calendarApiRef = React.createRef()
     const { rerender, debug } = render(<FullCalendar ref={calendarApiRef}/>);
     let locale = calendarApiRef.current.calendar.getOption('locale');
     expect(locale).toBe('')

     calendarApiRef.current.calendar.setOption('locale', 'fr');
     locale = calendarApiRef.current.calendar.getOption('locale');
     expect(locale).toBe('fr')
  })
})

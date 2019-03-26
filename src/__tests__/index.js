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
})

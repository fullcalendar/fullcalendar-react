import * as React from 'react'
import { forwardRef, useEffect, useImperativeHandle, useRef, MutableRefObject } from 'react'
import { Calendar, OptionsInput } from '@fullcalendar/core'

export default forwardRef((props: OptionsInput, componentRef) => {
  const elRef = useRef()
  const calRef: MutableRefObject<Calendar> = useRef()

  function getApi(): Calendar {
    return calRef.current
  }

  function init() {
    const cal = new Calendar(elRef.current, props)
    calRef.current = cal
    cal.render()
    // Cleanup callback automatically called before unmounting
    return () => cal.destroy()
  }

  function updateOptions() {
    calRef.current.resetOptions(props);
  }

  // Calendar initialization
  useEffect(init, [])

  // Calendar options update when props change
  useEffect(updateOptions, [calRef, props])

  // Allow Calendar API to be exposed to parent component when using ref
  useImperativeHandle(componentRef, () => ({ getApi }), [calRef])

  return <div ref={elRef}></div>
})

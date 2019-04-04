import * as React from 'react'
import { Calendar, OptionsInput } from '@fullcalendar/core'

const { forwardRef, useEffect, useImperativeHandle, useRef, useState } = React

export default forwardRef((props: OptionsInput, componentRef) => {
  const elRef = useRef()
  const [calendar, setCalendar] = useState()

  useEffect(() => {
    const c = new Calendar(elRef.current, props)
    setCalendar(c)
    c.render()
    return () => c.destroy()
  }, [])

  useEffect(() => calendar && calendar.resetOptions(props), [calendar, props])

  useImperativeHandle(componentRef, () => ({ getApi: (): Calendar => calendar }), [calendar])

  return <div ref={elRef}></div>
})

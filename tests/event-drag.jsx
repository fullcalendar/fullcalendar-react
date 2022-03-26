import React from 'react'
import {render, cleanup, fireEvent, waitForElementToBeRemoved} from 'react-testing-library'
import FullCalendar from '../dist/main'
import daygridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

const DEFAULT_OPTIONS = {
  plugins: [daygridPlugin,interactionPlugin],
  editable:true,
  initialDate: '2017-02-09',
  events: [{
    title: 'Event 1',
    start: '2017-02-09'
  }]
}


// like, react-testing-library/cleanup-after-each, but doesn't double-import react-testing-library
afterEach(() => cleanup())

describe("Drag and drop on same calendar should call eventDrop and not eventReceive", ()=>{
  it('without rerender', async function() {
    let eventReceiveCallback = jasmine.createSpy('eventReceiveCallback')
    let eventDropCallback = jasmine.createSpy('eventDropCallback')

    let options = {
      ...DEFAULT_OPTIONS,
      eventDrop: eventDropCallback,
      eventReceive: eventReceiveCallback,
    }
    let componentRef = React.createRef()
    let { container, rerender } = render(
      <FullCalendar {...options} ref={componentRef}/>
    )

    let element = getFirstEventEl(container)

    // normal drag and drop in same calendar should call eventDrop callback
    // and not eventReceive
    fireEvent.mouseDown(element)
    fireEvent.mouseMove(element, {clientX: -250})
    fireEvent.mouseUp(element)

    await waitForElementToBeRemoved(getDraggingEl)

    expect(eventDropCallback).toHaveBeenCalled();
    expect(eventReceiveCallback).not.toHaveBeenCalled();
  })


  it('with rerender during drag', async function() {
    let eventReceiveCallback = jasmine.createSpy('eventReceiveCallback')
    let eventDropCallback = jasmine.createSpy('eventDropCallback')

    let options = {
      ...DEFAULT_OPTIONS,
      eventDrop: eventDropCallback,
      eventReceive: eventReceiveCallback,
    }
    let componentRef = React.createRef()
    let { container, rerender } = render(
      <FullCalendar {...options} ref={componentRef}/>
    )

    let element = getFirstEventEl(container)

    // when rerendering the fullcalendar component with the same props during a
    // drag operation also eventDrop and not eventReceive should be called
    // this can be triggered by any wrapping component and should work seamlessly
    fireEvent.mouseDown(element)
    fireEvent.mouseMove(element, {clientX: -250})
    rerender(
      <FullCalendar {...options} ref={componentRef}/>
    )
    fireEvent.mouseUp(element)

    await waitForElementToBeRemoved(getDraggingEl)

    expect(eventDropCallback).toHaveBeenCalled();
    expect(eventReceiveCallback).not.toHaveBeenCalled();
  })
})

function getDraggingEl(container) {
  return document.querySelector(".fc-event-dragging")
}

function getFirstEventEl(container) {
  return container.querySelector('.fc-event')
}

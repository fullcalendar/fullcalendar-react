import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { OptionsInput, createPlugin, mapHash } from '@fullcalendar/core'
import { Calendar } from '@fullcalendar/preact'
import { diffProps } from './utils'


export default class FullCalendar extends React.Component<OptionsInput, any> {

  private elRef: any = React.createRef()
  private calendar: Calendar

  render() {
    return (
      <div ref={this.elRef}></div>
    )
  }

  componentDidMount() {
    this.calendar = new Calendar(this.elRef.current, processInitialOptions(this.props))
    this.calendar.render()
  }

  componentDidUpdate(oldProps) {
    let diff = diffProps(oldProps, this.props)
    if (diff.anyChanges) {
      this.calendar.mutateOptions(diff.updates, diff.removals)
    }
  }

  componentWillUnmount() {
    this.calendar.destroy()
  }

  getApi(): Calendar {
    return this.calendar
  }

}


/*
stuff to accommodate react-rendering in *Content settings...
(when we fullcalendar core supports real-react, this will go away)
*/


function processInitialOptions(options) {
  let processedOptions = mapHash(options, (optionVal, optionName) => {

    if (
      typeof optionVal === 'function' &&
      optionName.match(/Content$/) // HACKY. only settings like eventContent
    ) {
      return wrapVDomGenerator(optionVal) // will return a result like { react:.. }
    } else {
      return optionVal
    }
  })

  return {
    ...processedOptions,
    plugins: (processedOptions.plugins as any || []).concat([
      ReactContentTypePlugin
    ])
  }
}


function wrapVDomGenerator(vDomGenerator) {
  return function() {
    return { react: vDomGenerator.apply(this, arguments) }
  }
}


const ReactContentTypePlugin = createPlugin({
  contentTypeHandlers: {
    react: buildVDomHandler
  }
})


function buildVDomHandler() {
  let currentEl

  return function(el, vDomContent) { // the handler

    if (currentEl !== el) {
      if (currentEl) {
        ReactDOM.unmountComponentAtNode(currentEl)
      }
      currentEl = el
    }

    ReactDOM.render(vDomContent, el)
  }
}

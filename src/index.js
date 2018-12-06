import React from 'react';
import { Calendar } from 'fullcalendar';
import 'fullcalendar/plugins/rrule';
import CalendarOptionsMapper from './calendarOptionsMapper';

export default class FullCalendar extends React.Component{
	constructor(){
		super();
		this.calendarOptionsMapper = new CalendarOptionsMapper();
		this.root = null;
		this.calendar = null;
		this.date = new Date();
	}

	componentDidMount(){
		const calendarOptions = this.calendarOptionsMapper.getOptions(this.props);
		const calendarEl = document.getElementById(this.root);

		this.calendar = new Calendar(calendarEl, calendarOptions);
  	this.calendar.render();
	}

	componentWillReceiveProps(nextProps){
		this.calendar.destroy();

		const calendarOptions = this.calendarOptionsMapper.getOptions(nextProps);
		const calendarEl = document.getElementById(this.root);

		this.calendar = new Calendar(calendarEl, calendarOptions);
  	this.calendar.render();
	}

	render(){
		this.root = this.props.id || 'ID' + this.date.getTime(); 
		return(
			<div id={this.root}></div>
		)
	}
}
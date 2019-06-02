/// <reference types="react" />
declare module "@fullcalendar/react" {
    import * as React from 'react';
    import { Calendar, OptionsInput } from '@fullcalendar/core';
    export default class FullCalendar extends React.Component<OptionsInput, any> {
        private elRef;
        private calendar;
        render(): JSX.Element;
        componentDidMount(): void;
        componentDidUpdate(oldProps: any): void;
        componentWillUnmount(): void;
        getApi(): Calendar;
    }
}

/*
FullCalendar React Component v4.2.0
Docs: https://fullcalendar.io/docs/react
License: MIT
*/
import deepEqual from 'fast-deep-equal';
import { createRef, createElement, Component } from 'react';
import { Calendar } from '@fullcalendar/core';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var FullCalendar = /** @class */ (function (_super) {
    __extends(FullCalendar, _super);
    function FullCalendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.elRef = createRef();
        return _this;
    }
    FullCalendar.prototype.render = function () {
        return (createElement("div", { ref: this.elRef }));
    };
    FullCalendar.prototype.componentDidMount = function () {
        this.calendar = new Calendar(this.elRef.current, this.props);
        this.calendar.render();
    };
    FullCalendar.prototype.componentDidUpdate = function (oldProps) {
        var props = this.props;
        var updates = {};
        var removals = [];
        for (var propName in oldProps) {
            if (!(propName in props)) {
                removals.push(propName);
            }
        }
        /*
        Do a deep-comparison for prop changes. We do this because often times the parent component will pass in
        an object literal that generates a new reference every time its render() function runs.
        This isn't too much of a performance hit because normally these object literals are rather small.
        For larger data, the parent component will almost definitely generate a new reference on every mutation,
        because immutable prop data is the norm in React-world, making the deepEqual function execute really fast.
        */
        for (var propName in props) {
            if (!deepEqual(props[propName], oldProps[propName])) {
                updates[propName] = props[propName];
            }
        }
        this.calendar.mutateOptions(updates, removals, false, deepEqual);
    };
    FullCalendar.prototype.componentWillUnmount = function () {
        this.calendar.destroy();
    };
    FullCalendar.prototype.getApi = function () {
        return this.calendar;
    };
    return FullCalendar;
}(Component));

export default FullCalendar;

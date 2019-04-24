/*
FullCalendar React Component v4.1.0
Docs: https://fullcalendar.io/docs/react
License: MIT
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@fullcalendar/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', '@fullcalendar/core'], factory) :
    (global = global || self, factory(global.FullCalendarReact = {}, global.React, global.FullCalendar));
}(this, function (exports, React, core) { 'use strict';

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
            _this.elRef = React.createRef();
            return _this;
        }
        FullCalendar.prototype.render = function () {
            return (React.createElement("div", { ref: this.elRef }));
        };
        FullCalendar.prototype.componentDidMount = function () {
            this.calendar = new core.Calendar(this.elRef.current, this.props);
            this.calendar.render();
        };
        FullCalendar.prototype.componentWillReceiveProps = function (nextProps) {
            this.calendar.resetOptions(nextProps);
        };
        FullCalendar.prototype.componentWillUnmount = function () {
            this.calendar.destroy();
        };
        FullCalendar.prototype.getApi = function () {
            return this.calendar;
        };
        return FullCalendar;
    }(React.Component));

    exports.default = FullCalendar;

    Object.defineProperty(exports, '__esModule', { value: true });

}));

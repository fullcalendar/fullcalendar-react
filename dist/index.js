"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@fullcalendar/core");

var _daygrid = _interopRequireDefault(require("@fullcalendar/daygrid"));

require("@fullcalendar/core/main.css");

require("@fullcalendar/daygrid/main.css");

var _calendarOptionsMapper = _interopRequireDefault(require("./calendarOptionsMapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FullCalendar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FullCalendar, _React$Component);

  function FullCalendar() {
    var _this;

    _classCallCheck(this, FullCalendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FullCalendar).call(this));
    _this.calendarOptionsMapper = new _calendarOptionsMapper.default();
    _this.root = null;
    _this.calendar = null;
    _this.date = new Date();
    return _this;
  }

  _createClass(FullCalendar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var calendarOptions = this.calendarOptionsMapper.getOptions(this.props);
      var calendarEl = document.getElementById(this.root);
      var passedPlugins = calendarOptions.plugins ? calendarOptions.plugins : [];
      this.calendar = new _core.Calendar(calendarEl, _objectSpread({}, calendarOptions, {
        plugins: [_daygrid.default].concat(_toConsumableArray(passedPlugins))
      }));
      this.calendar.render();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.calendar.destroy();
      var calendarOptions = this.calendarOptionsMapper.getOptions(nextProps);
      var calendarEl = document.getElementById(this.root);
      var passedPlugins = calendarOptions.plugins ? calendarOptions.plugins : [];
      this.calendar = new _core.Calendar(calendarEl, _objectSpread({}, calendarOptions, {
        plugins: [_daygrid.default]
      }));
      this.calendar.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.root = this.props.id || 'ID' + this.date.getTime();
      return _react.default.createElement("div", {
        id: this.root
      });
    }
  }]);

  return FullCalendar;
}(_react.default.Component);

var _default = FullCalendar;
exports.default = _default;
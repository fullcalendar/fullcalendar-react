"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CalendarOptionsMapper =
/*#__PURE__*/
function () {
  function CalendarOptionsMapper() {
    _classCallCheck(this, CalendarOptionsMapper);
  }

  _createClass(CalendarOptionsMapper, [{
    key: "getOptions",
    value: function getOptions(properties) {
      var newProps = {};

      for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
          newProps[key] = properties[key];
        }
      }

      return newProps;
    }
  }]);

  return CalendarOptionsMapper;
}();

exports.default = CalendarOptionsMapper;
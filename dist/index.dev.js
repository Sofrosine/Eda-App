"use strict";

require("react-native-gesture-handler");

var _reactNative = require("react-native");

var _App = _interopRequireDefault(require("./App"));

var _app = require("./app.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
_reactNative.AppRegistry.registerComponent(_app.name, function () {
  return _App["default"];
});
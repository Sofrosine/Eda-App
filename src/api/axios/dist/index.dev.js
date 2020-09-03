"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var baseURL = 'http://178.128.212.200/api/merchant';

var getUser = function getUser() {
  var token, location, phone;
  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _utils.getData)('@user_token'));

        case 2:
          token = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _utils.getData)('@user_location'));

        case 5:
          location = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap((0, _utils.getData)('@user_phone'));

        case 8:
          phone = _context.sent;
          return _context.abrupt("return", {
            token: token,
            location: location,
            phone: phone
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

var api = function api(method, endpoint) {
  var params,
      isForm,
      dataUser,
      startAxios,
      _args2 = arguments;
  return regeneratorRuntime.async(function api$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          isForm = _args2.length > 3 ? _args2[3] : undefined;
          _context2.next = 4;
          return regeneratorRuntime.awrap(getUser());

        case 4:
          dataUser = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _axios["default"])({
            method: method,
            url: "".concat(baseURL, "/").concat(endpoint),
            headers: {
              Authorization: "Bearer ".concat(dataUser.token),
              'Content-Type': isForm && 'multipart/form-data'
            },
            params: _objectSpread({}, params),
            data: params
          }));

        case 7:
          startAxios = _context2.sent;
          return _context2.abrupt("return", startAxios);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var _default = api;
exports["default"] = _default;
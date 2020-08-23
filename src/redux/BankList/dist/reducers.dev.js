"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  data: [],
  error: false,
  selectedBank: []
};

var bankListReducer = function bankListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.GET_BANK_LIST:
      return _objectSpread({}, state, {
        loading: true
      });

    case _constants.GET_BANK_LIST_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        data: action.payload.res,
        selectedBank: action.payload.selectedBank
      });

    case _constants.GET_BANK_LIST_FAILED:
      return _objectSpread({}, state, {
        loading: false,
        error: action.payload.error
      });

    case _constants.SET_BANK_LIST:
      return _objectSpread({}, state, {
        selectedBank: action.payload.newSelectedBank
      });

    default:
      return state;
  }
};

var _default = bankListReducer;
exports["default"] = _default;
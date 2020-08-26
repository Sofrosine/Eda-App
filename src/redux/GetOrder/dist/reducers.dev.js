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
  activeData: [],
  inactiveData: [],
  error: false,
  page: 1,
  isActivePagination: true,
  isInactivePagination: true
};

var getOrderReducer = function getOrderReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants.GET_ACTIVE_ORDER:
      return _objectSpread({}, state, {
        loading: true
      });

    case _constants.GET_ACTIVE_ORDER_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        activeData: action.payload.resActive
      });

    case _constants.GET_ACTIVE_ORDER_FAILED:
      return _objectSpread({}, state, {
        loading: false,
        error: action.payload.error
      });

    case _constants.GET_INACTIVE_ORDER:
      return _objectSpread({}, state, {
        loading: true
      });

    case _constants.GET_INACTIVE_ORDER_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        inactiveData: action.payload.resInActive
      });

    case _constants.GET_INACTIVE_ORDER_FAILED:
      return _objectSpread({}, state, {
        loading: false,
        error: action.payload.error
      });

    case _constants.SET_PAGE_ORDER:
      return _objectSpread({}, state, {
        loading: false,
        page: state.page + 1
      });

    case _constants.RESET_PAGE_ORDER:
      return _objectSpread({}, state, {
        loading: false,
        page: 1
      });

    case _constants.STOP_PAGINATION_ACTIVE_ORDER:
      return _objectSpread({}, state, {
        isActivePagination: action.payload.paginationStatus
      });

    case _constants.STOP_PAGINATION_INACTIVE_ORDER:
      return _objectSpread({}, state, {
        isInactivePagination: action.payload.paginationStatus
      });

    default:
      return state;
  }
};

var _default = getOrderReducer;
exports["default"] = _default;
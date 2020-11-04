"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocationMoveAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _reactNative = require("react-native");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_KEY = 'AIzaSyCXm61G-_saju7hWgWqZwuVyblSjjg2FIk';

var setLocationMove = function setLocationMove() {
  return {
    type: _constants.SET_LOCATION_MOVE
  };
};

var setLocationMoveFailed = function setLocationMoveFailed(error) {
  return {
    type: _constants.SET_LOCATION_MOVE_FAILED,
    payload: {
      error: error
    }
  };
};

var setLocationMoveSuccess = function setLocationMoveSuccess(res, latitude, longitude) {
  return {
    type: _constants.SET_LOCATION_MOVE_SUCCESS,
    payload: {
      res: res,
      latitude: latitude,
      longitude: longitude
    }
  };
};

var setLocationMoveAction = function setLocationMoveAction(latitude, longitude) {
  return function _callee(dispatch) {
    var apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(setLocationMove());
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("https://maps.googleapis.com/maps/api/geocode/json?latlng=".concat(latitude, ",").concat(longitude, "&key=").concat(API_KEY)));

          case 4:
            apiReq = _context.sent;
            console.log('move location', apiReq);
            dispatch(setLocationMoveSuccess(apiReq.data, latitude, longitude));
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log('error move location', _context.t0);
            dispatch(setLocationMoveFailed(_context.t0));
            Platform.OS === 'ios' ? _reactNative.Alert.alert('Gagal memproses lokasi') : _reactNative.ToastAndroid.show('Gagal memproses lokasi', 2000);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 9]]);
  };
};

exports.setLocationMoveAction = setLocationMoveAction;
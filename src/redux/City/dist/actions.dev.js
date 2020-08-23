"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOnlyCityAction = exports.resetCityAction = exports.setCityAction = exports.getCityAction = void 0;

var _constants = require("./constants");

var _api = require("../../api");

var _actions = require("../District/actions");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getCity = function getCity() {
  return {
    type: _constants.GET_CITY
  };
};

var getCitySuccess = function getCitySuccess(res) {
  return {
    type: _constants.GET_CITY_SUCCESS,
    payload: {
      res: res
    }
  };
};

var getCityFailed = function getCityFailed(error) {
  return {
    type: _constants.GET_CITY_FAILED,
    payload: {
      error: error
    }
  };
};

var setCity = function setCity(newSelectedCity) {
  return {
    type: _constants.SET_CITY,
    payload: {
      newSelectedCity: newSelectedCity
    }
  };
};

var resetCity = function resetCity() {
  return {
    type: _constants.RESET_CITY
  };
};

var getOnlyCitySuccess = function getOnlyCitySuccess(onlyRes, selectedOnlyCity) {
  return {
    type: _constants.GET_ONLY_CITY,
    payload: {
      onlyRes: onlyRes,
      selectedOnlyCity: selectedOnlyCity
    }
  };
};

var getCityAction = function getCityAction(province_id, purpose) {
  return function _callee(dispatch) {
    var arr, apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(getCity());
            arr = [{
              id: 'placeholder',
              name: 'Pilih Kota'
            }];
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _api.api)('get', "city?province_id=".concat(province_id, "&purpose=").concat(purpose)));

          case 5:
            apiReq = _context.sent;
            arr = _toConsumableArray(arr).concat(_toConsumableArray(apiReq.data.data));
            dispatch(getCitySuccess(arr));
            dispatch(setCity(apiReq.data.data[0].name));
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            console.log('error province', _context.t0);
            dispatch(getCityFailed(_context.t0));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 11]]);
  };
};

exports.getCityAction = getCityAction;

var setCityAction = function setCityAction(val) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'register';
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(setCity(val));
            console.log('avalal', _typeof(val));

            if (val !== 'placeholder') {
              dispatch((0, _actions.getDistrictAction)(val, type));
            } else {
              dispatch((0, _actions.resetDistrictAction)());
            }

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.setCityAction = setCityAction;

var resetCityAction = function resetCityAction(val) {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch(resetCity());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.resetCityAction = resetCityAction;

var getOnlyCityAction = function getOnlyCityAction(purpose, province_id, city_id) {
  return function _callee4(dispatch) {
    var apiReq, arr, selectedArr;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dispatch(getCity());
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap((0, _api.api)('get', "city?province_id=".concat(province_id, "&purpose=").concat(purpose)));

          case 4:
            apiReq = _context4.sent;
            arr = apiReq.data.data;
            selectedArr = arr.filter(function (item) {
              return Number(item.id) === Number(city_id);
            });
            dispatch(getOnlyCitySuccess(arr, selectedArr[0].id));
            _context4.next = 14;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](1);
            console.log('error city', _context4.t0);
            dispatch(getCityFailed(_context4.t0));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 10]]);
  };
};

exports.getOnlyCityAction = getOnlyCityAction;
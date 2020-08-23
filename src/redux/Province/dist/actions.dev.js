"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOnlyProvinceAction = exports.setProvinceAction = exports.getProvinceAction = void 0;

var _constants = require("./constants");

var _api = require("../../api");

var _actions = require("../City/actions");

var _actions2 = require("../District/actions");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getProvince = function getProvince() {
  return {
    type: _constants.GET_PROVINCE
  };
};

var getProvinceSuccess = function getProvinceSuccess(res, selectedProvince) {
  return {
    type: _constants.GET_PROVINCE_SUCCESS,
    payload: {
      res: res,
      selectedProvince: selectedProvince
    }
  };
};

var getProvinceFailed = function getProvinceFailed(error) {
  return {
    type: _constants.GET_PROVINCE_FAILED,
    payload: {
      error: error
    }
  };
};

var setProvince = function setProvince(newSelectedProvince) {
  return {
    type: _constants.SET_PROVINCE,
    payload: {
      newSelectedProvince: newSelectedProvince
    }
  };
};

var getOnlyProvinceSuccess = function getOnlyProvinceSuccess(onlyRes, selectedOnlyProvince) {
  return {
    type: _constants.GET_ONLY_PROVINCE,
    payload: {
      onlyRes: onlyRes,
      selectedOnlyProvince: selectedOnlyProvince
    }
  };
};

var getProvinceAction = function getProvinceAction(purpose) {
  return function _callee(dispatch) {
    var arr, apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(getProvince());
            arr = [{
              name: 'Pilih Provinsi',
              id: 'placeholder'
            }];
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _api.api)('get', "province?purpose=".concat(purpose)));

          case 5:
            apiReq = _context.sent;
            arr = _toConsumableArray(arr).concat(_toConsumableArray(apiReq.data.data));
            dispatch(getProvinceSuccess(arr, apiReq.data.data[0].name));
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.log('error province', _context.t0);
            dispatch(getProvinceFailed(_context.t0));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 10]]);
  };
};

exports.getProvinceAction = getProvinceAction;

var setProvinceAction = function setProvinceAction(val) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'register';
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(setProvince(val));
            console.log('avalal', val);

            if (val !== 'placeholder') {
              dispatch((0, _actions.getCityAction)(val, type));
            } else {
              dispatch((0, _actions.resetCityAction)());
              dispatch((0, _actions2.resetDistrictAction)());
            }

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.setProvinceAction = setProvinceAction;

var getOnlyProvinceAction = function getOnlyProvinceAction(purpose, id) {
  return function _callee3(dispatch) {
    var apiReq, arr, selectedArr;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch(getProvince());
            _context3.prev = 1;
            _context3.next = 4;
            return regeneratorRuntime.awrap((0, _api.api)('get', "province?purpose=".concat(purpose)));

          case 4:
            apiReq = _context3.sent;
            arr = apiReq.data.data;
            selectedArr = arr.filter(function (item) {
              return Number(item.id) === Number(id);
            });
            dispatch(getOnlyProvinceSuccess(arr, selectedArr[0].id));
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            console.log('error province', _context3.t0);
            dispatch(getProvinceFailed(_context3.t0));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 10]]);
  };
};

exports.getOnlyProvinceAction = getOnlyProvinceAction;
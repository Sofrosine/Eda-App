"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOnlyDistrictAction = exports.resetDistrictAction = exports.setDistrictAction = exports.getDistrictAction = void 0;

var _constants = require("./constants");

var _api = require("../../api");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getDistrict = function getDistrict() {
  return {
    type: _constants.GET_DISTRICT
  };
};

var getDistrictSuccess = function getDistrictSuccess(res) {
  return {
    type: _constants.GET_DISTRICT_SUCCESS,
    payload: {
      res: res
    }
  };
};

var getDistrictFailed = function getDistrictFailed(error) {
  return {
    type: _constants.GET_DISTRICT_FAILED,
    payload: {
      error: error
    }
  };
};

var setDistrict = function setDistrict(newSelectedDistrict) {
  return {
    type: _constants.SET_DISTRICT,
    payload: {
      newSelectedDistrict: newSelectedDistrict
    }
  };
};

var resetDistrict = function resetDistrict() {
  return {
    type: _constants.RESET_DISTRICT
  };
};

var getOnlyDistrictSuccess = function getOnlyDistrictSuccess(onlyRes, selectedOnlyDistrict) {
  return {
    type: _constants.GET_ONLY_DISTRICT,
    payload: {
      onlyRes: onlyRes,
      selectedOnlyDistrict: selectedOnlyDistrict
    }
  };
};

var getDistrictAction = function getDistrictAction(city_id, purpose) {
  return function _callee(dispatch) {
    var arr, apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(getDistrict());
            arr = [{
              id: 'placeholder',
              name: 'Pilih Distrik'
            }];
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _api.api)('get', "district?city_id=".concat(city_id, "&purpose=").concat(purpose)));

          case 5:
            apiReq = _context.sent;
            arr = _toConsumableArray(arr).concat(_toConsumableArray(apiReq.data.data));
            dispatch(getDistrictSuccess(arr));
            dispatch(setDistrict(arr[0].id));
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            console.log('error district', _context.t0);
            dispatch(getDistrictFailed(_context.t0));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 11]]);
  };
};

exports.getDistrictAction = getDistrictAction;

var setDistrictAction = function setDistrictAction(val) {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(setDistrict(val));
            console.log('avalal', val);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.setDistrictAction = setDistrictAction;

var resetDistrictAction = function resetDistrictAction(val) {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch(resetDistrict());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.resetDistrictAction = resetDistrictAction;

var getOnlyDistrictAction = function getOnlyDistrictAction(purpose, city_id, district_id) {
  return function _callee4(dispatch) {
    var apiReq, arr, selectedArr;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dispatch(getDistrict());
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap((0, _api.api)('get', "district?city_id=".concat(city_id, "&purpose=").concat(purpose)));

          case 4:
            apiReq = _context4.sent;
            arr = apiReq.data.data;
            selectedArr = arr.filter(function (item) {
              return Number(item.id) === Number(district_id);
            });
            dispatch(getOnlyDistrictSuccess(arr, selectedArr[0].id));
            _context4.next = 14;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](1);
            console.log('error city', _context4.t0);
            dispatch(getDistrictFailed(_context4.t0));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 10]]);
  };
};

exports.getOnlyDistrictAction = getOnlyDistrictAction;
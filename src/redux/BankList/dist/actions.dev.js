"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBankListAction = exports.getBankListAction = void 0;

var _constants = require("./constants");

var _api = require("../../api");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getBankList = function getBankList() {
  return {
    type: _constants.GET_BANK_LIST
  };
};

var getBankListSuccess = function getBankListSuccess(res, selectedBank) {
  return {
    type: _constants.GET_BANK_LIST_SUCCESS,
    payload: {
      res: res,
      selectedBank: selectedBank
    }
  };
};

var getBankListFailed = function getBankListFailed(error) {
  return {
    type: _constants.GET_BANK_LIST_FAILED,
    payload: {
      error: error
    }
  };
};

var setBankList = function setBankList(newSelectedBank) {
  return {
    type: _constants.SET_BANK_LIST,
    payload: {
      newSelectedBank: newSelectedBank
    }
  };
};

var getBankListAction = function getBankListAction() {
  return function _callee(dispatch) {
    var arr, apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(getBankList());
            arr = [{
              name: 'Pilih Jenis Rekening',
              id: 'placeholder'
            }];
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _api.api)('get', "bank"));

          case 5:
            apiReq = _context.sent;
            arr = _toConsumableArray(arr).concat(_toConsumableArray(apiReq.data.data));
            dispatch(getBankListSuccess(arr, apiReq.data.data[0].name));
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.log('error BankList', _context.t0);
            dispatch(getBankListFailed(_context.t0));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 10]]);
  };
};

exports.getBankListAction = getBankListAction;

var setBankListAction = function setBankListAction(val) {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(setBankList(val));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.setBankListAction = setBankListAction;
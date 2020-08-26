"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDetailOrderAction = void 0;

var _constants = require("./constants");

var _api = require("../../api");

var _actions = require("../Loading/actions");

var getDetailOrder = function getDetailOrder() {
  return {
    type: _constants.DETAIL_ORDER
  };
};

var getDetailOrderSuccess = function getDetailOrderSuccess(res) {
  return {
    type: _constants.DETAIL_ORDER_SUCCESS,
    payload: {
      res: res
    }
  };
};

var getDetailOrderFailed = function getDetailOrderFailed(error) {
  return {
    type: _constants.DETAIL_ORDER_FAILED,
    payload: {
      error: error
    }
  };
};

var getDetailOrderAction = function getDetailOrderAction(id) {
  return function _callee(dispatch) {
    var apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions.setLoadingAction)(true));
            dispatch(getDetailOrder());
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _api.api)('get', "order/detail?id=".concat(id)));

          case 5:
            apiReq = _context.sent;
            dispatch(getDetailOrderSuccess(apiReq.data.data));
            console.log('apih detail', apiReq.data.data);
            dispatch((0, _actions.setLoadingAction)(false));
            _context.next = 16;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            console.log('get detail order', _context.t0);
            dispatch(getDetailOrderFailed(_context.t0));
            dispatch((0, _actions.setLoadingAction)(false));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 11]]);
  };
};

exports.getDetailOrderAction = getDetailOrderAction;
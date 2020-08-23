"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailablePaymentAction = void 0;

var _constants = require("./constants");

var _api = require("../../api");

var _actions = require("../Loading/actions");

var getAvailablePayment = function getAvailablePayment() {
  return {
    type: _constants.GET_AVAILABLE_PAYMENT
  };
};

var getAvailablePaymentSuccess = function getAvailablePaymentSuccess(transferDataRes, paymentGatewayDataRes) {
  return {
    type: _constants.GET_AVAILABLE_PAYMENT_SUCCESS,
    payload: {
      transferDataRes: transferDataRes,
      paymentGatewayDataRes: paymentGatewayDataRes
    }
  };
};

var getAvailablePaymentFailed = function getAvailablePaymentFailed(error) {
  return {
    type: _constants.GET_AVAILABLE_PAYMENT_FAILED,
    payload: {
      error: error
    }
  };
};

var getAvailablePaymentAction = function getAvailablePaymentAction() {
  return function _callee(dispatch) {
    var apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions.setLoadingAction)(true));
            dispatch(getAvailablePayment());
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _api.api)('get', 'available-payment'));

          case 5:
            apiReq = _context.sent;
            console.log('api req avialablepayment', apiReq);
            dispatch(getAvailablePaymentSuccess(apiReq.data.data.transfer, apiReq.data.data.payment_gateway));
            dispatch((0, _actions.setLoadingAction)(false));
            _context.next = 16;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            console.log('error available payment', _context.t0);
            dispatch(getAvailablePaymentFailed(_context.t0));
            dispatch((0, _actions.setLoadingAction)(false));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 11]]);
  };
};

exports.getAvailablePaymentAction = getAvailablePaymentAction;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPaymentAction = void 0;

var _constants = require("./constants");

var _api = require("../../api");

var _actions = require("../Loading/actions");

// pakai akunku juga coba mas
// email: soultanmuh@gmail.com
// p: password
var setPaymentManual = function setPaymentManual() {
  return {
    type: _constants.SET_PAYMENT_MANUAL
  };
};

var setPaymentManualSuccess = function setPaymentManualSuccess(res) {
  return {
    type: _constants.SET_PAYMENT_MANUAL_SUCCESS,
    payload: {
      res: res
    }
  };
};

var setPaymentManualFailed = function setPaymentManualFailed(error) {
  return {
    type: _constants.SET_PAYMENT_MANUAL_FAILED,
    payload: {
      error: error
    }
  };
};

var setPaymentAction = function setPaymentAction(form, navigation) {
  var order_id = form.order_id,
      bank_sender_account_name = form.bank_sender_account_name,
      bank_sender_account_number = form.bank_sender_account_number,
      bank_sender_id = form.bank_sender_id,
      bank_receiver_account_name = form.bank_receiver_account_name,
      bank_receiver_account_number = form.bank_receiver_account_number,
      bank_receiver_id = form.bank_receiver_id,
      amount = form.amount,
      transfer_proof_id = form.transfer_proof_id;
  return function _callee(dispatch) {
    var apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions.setLoadingAction)(true));
            dispatch(setPaymentManual());
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _api.api)('post', 'upload-manual-transfer', {
              order_id: order_id,
              bank_sender_account_name: bank_sender_account_name,
              bank_sender_account_number: bank_sender_account_number,
              bank_sender_id: bank_sender_id,
              bank_receiver_account_name: bank_receiver_account_name,
              bank_receiver_account_number: bank_receiver_account_number,
              bank_receiver_id: bank_receiver_id,
              amount: amount,
              transfer_proof_id: transfer_proof_id
            }));

          case 5:
            apiReq = _context.sent;
            console.log('pay', apiReq);
            dispatch((0, _actions.setLoadingAction)(false));
            navigation.replace('OrderVerificationProcess');
            _context.next = 16;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](2);
            console.log('error payment manual', _context.t0);
            dispatch(setPaymentManualFailed(_context.t0));
            dispatch((0, _actions.setLoadingAction)(false));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 11]]);
  };
};

exports.setPaymentAction = setPaymentAction;
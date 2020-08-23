"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelOrderAction = void 0;

var _constants = require("./constants");

var _actions = require("../Loading/actions");

var _reactNative = require("react-native");

var _api = require("../../api");

var cancelOrder = function cancelOrder() {
  return {
    type: _constants.CANCEL_ORDER
  };
};

var cancelOrderSuccess = function cancelOrderSuccess(res) {
  return {
    type: _constants.CANCEL_ORDER_SUCCESS,
    payload: {
      res: res
    }
  };
};

var cancelOrderFailed = function cancelOrderFailed(error) {
  return {
    type: _constants.CANCEL_ORDER_FAILED,
    payload: {
      error: error
    }
  };
};

var cancelOrderAction = function cancelOrderAction(id, navigation) {
  return function _callee(dispatch) {
    var apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions.setLoadingAction)(true));
            dispatch(cancelOrder());
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _api.api)('post', 'order/delete', {
              id: id
            }));

          case 5:
            apiReq = _context.sent;
            console.log('delete successs', apiReq);
            dispatch(cancelOrderSuccess(apiReq));

            _reactNative.ToastAndroid.show('Berhasil membatalkan order', 2000);

            navigation.replace('HomeDrawer');
            _context.next = 18;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.log('error cancel', _context.t0);
            dispatch(cancelOrderFailed(_context.t0));

            _reactNative.Alert.alert('Gagal membatalkan order');

            dispatch((0, _actions.setLoadingAction)(false));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 12]]);
  };
};

exports.cancelOrderAction = cancelOrderAction;
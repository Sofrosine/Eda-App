"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOrderAction = void 0;

var _constants = require("./constants");

var _api = require("../../api");

var _axios = _interopRequireDefault(require("axios"));

var _reactNative = require("react-native");

var _actions = require("../Loading/actions");

var _actions2 = require("../UploadImage/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addOrder = function addOrder() {
  return {
    type: _constants.ADD_ORDER
  };
};

var addOrderSuccess = function addOrderSuccess(res) {
  return {
    type: _constants.ADD_ORDER_SUCCESS,
    payload: {
      res: res
    }
  };
};

var addOrderFailed = function addOrderFailed(error) {
  return {
    type: _constants.ADD_ORDER_FAILED,
    payload: {
      error: error
    }
  };
};

var addOrderAction = function addOrderAction(form, navigation) {
  return function _callee(dispatch) {
    var schedule, receiver_name, receiver_phone, receiver_address, receiver_latitude, receiver_longitude, district_id, payment_method, _form$details$, product_name, product_description, product_height, product_weight, product_length, product_width, category_id, product_image_id, apiReq;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions.setLoadingAction)(true));
            dispatch(addOrder());
            schedule = form.schedule, receiver_name = form.receiver_name, receiver_phone = form.receiver_phone, receiver_address = form.receiver_address, receiver_latitude = form.receiver_latitude, receiver_longitude = form.receiver_longitude, district_id = form.district_id, payment_method = form.payment_method;
            _form$details$ = form.details[0], product_name = _form$details$.product_name, product_description = _form$details$.product_description, product_height = _form$details$.product_height, product_weight = _form$details$.product_weight, product_length = _form$details$.product_length, product_width = _form$details$.product_width, category_id = _form$details$.category_id, product_image_id = _form$details$.product_image_id;
            _context.prev = 4;
            _context.next = 7;
            return regeneratorRuntime.awrap((0, _api.api)('post', 'order', {
              schedule: schedule,
              receiver_name: receiver_name,
              receiver_phone: receiver_phone,
              receiver_address: receiver_address,
              receiver_latitude: receiver_latitude,
              receiver_longitude: receiver_longitude,
              district_id: district_id,
              payment_method: payment_method,
              details: [{
                product_name: product_name,
                product_description: product_description,
                product_height: product_height,
                product_weight: product_weight,
                product_length: product_length,
                product_width: product_width,
                category_id: category_id,
                product_image_id: product_image_id
              }]
            }));

          case 7:
            apiReq = _context.sent;
            console.log('apiREQQQ', apiReq);
            dispatch(addOrderSuccess(apiReq));
            dispatch((0, _actions.setLoadingAction)(false));
            navigation.replace('CreateOrder2', {
              order_id: apiReq.data.data.id
            });
            dispatch((0, _actions2.resetUploadImageAction)());
            _context.next = 21;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](4);
            console.log('error add Order', _context.t0);
            dispatch(addOrderFailed(_context.t0));

            _reactNative.Alert.alert('Mohon koreksi data Anda atau coba beberapa saat lagi');

            dispatch((0, _actions.setLoadingAction)(false));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 15]]);
  };
};

exports.addOrderAction = addOrderAction;
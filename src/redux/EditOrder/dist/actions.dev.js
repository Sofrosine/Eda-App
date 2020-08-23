"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editOrderAction = void 0;

var _constants = require("./constants");

var _api = require("../../api");

var _axios = _interopRequireDefault(require("axios"));

var _reactNative = require("react-native");

var _actions = require("../Loading/actions");

var _actions2 = require("../UploadImage/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var editOrder = function editOrder() {
  return {
    type: _constants.EDIT_ORDER
  };
};

var editOrderSuccess = function editOrderSuccess(res) {
  return {
    type: _constants.EDIT_ORDER_SUCCESS,
    payload: {
      res: res
    }
  };
};

var editOrderFailed = function editOrderFailed(error) {
  return {
    type: _constants.EDIT_ORDER_FAILED,
    payload: {
      error: error
    }
  };
};

var editOrderAction = function editOrderAction(form, navigation) {
  return function _callee(dispatch) {
    var id, schedule, receiver_name, receiver_phone, receiver_address, receiver_latitude, receiver_longitude, district_id, payment_method, _form$details$, product_name, product_description, product_height, product_weight, product_length, product_width, category_id, product_image_id, apiReq;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions.setLoadingAction)(true));
            dispatch(editOrder());
            id = form.id, schedule = form.schedule, receiver_name = form.receiver_name, receiver_phone = form.receiver_phone, receiver_address = form.receiver_address, receiver_latitude = form.receiver_latitude, receiver_longitude = form.receiver_longitude, district_id = form.district_id, payment_method = form.payment_method;
            _form$details$ = form.details[0], product_name = _form$details$.product_name, product_description = _form$details$.product_description, product_height = _form$details$.product_height, product_weight = _form$details$.product_weight, product_length = _form$details$.product_length, product_width = _form$details$.product_width, category_id = _form$details$.category_id, product_image_id = _form$details$.product_image_id;
            _context.prev = 4;
            console.log(form);
            _context.next = 8;
            return regeneratorRuntime.awrap((0, _api.api)('post', 'order/update', {
              id: id,
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

          case 8:
            apiReq = _context.sent;
            console.log('edit broo', apiReq);
            dispatch(editOrderSuccess(apiReq));
            dispatch((0, _actions.setLoadingAction)(false));
            navigation.replace('DetailOrder', {
              id: apiReq.data.data.id
            });
            dispatch((0, _actions2.resetUploadImageAction)());
            _context.next = 22;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](4);
            console.log('error edit Order', _context.t0);
            dispatch(editOrderFailed(_context.t0));

            _reactNative.Alert.alert('Mohon koreksi data Anda atau coba beberapa saat lagi');

            dispatch((0, _actions.setLoadingAction)(false));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 16]]);
  };
};

exports.editOrderAction = editOrderAction;
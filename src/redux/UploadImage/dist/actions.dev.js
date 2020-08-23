"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUploadImageAction = exports.resetUploadImageAction = exports.uploadImageAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _constants = require("./constants");

var _actions = require("../Loading/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var uploadImage = function uploadImage() {
  return {
    type: _constants.UPLOAD_IMAGE
  };
};

var uploadImageSuccess = function uploadImageSuccess(res) {
  return {
    type: _constants.UPLOAD_IMAGE_SUCCESS,
    payload: {
      res: res
    }
  };
};

var uploadImageFailed = function uploadImageFailed(error) {
  return {
    type: _constants.UPLOAD_IMAGE_FAILED,
    payload: {
      error: error
    }
  };
};

var resetUploadImage = function resetUploadImage() {
  return {
    type: _constants.RESET_UPLOAD_IMAGE
  };
};

var setUploadImage = function setUploadImage(url, id) {
  return {
    type: _constants.SET_UPLOAD_IMAGE,
    payload: {
      url: url,
      id: id
    }
  };
};

var uploadImageAction = function uploadImageAction(formData) {
  return function _callee(dispatch) {
    var apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions.setLoadingAction)(true));
            console.log('formdatahh', formData);
            dispatch(uploadImage());
            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post('http://178.128.212.200/api/merchant/image/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }));

          case 6:
            apiReq = _context.sent;
            // const apiReq = await api('post', 'image/upload', formData, true);
            console.log('apiReqq photo', apiReq);
            dispatch(uploadImageSuccess(apiReq.data.data));
            dispatch((0, _actions.setLoadingAction)(false));
            _context.next = 17;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](3);
            console.log('error image', _context.t0);
            dispatch(uploadImageFailed(_context.t0));
            dispatch((0, _actions.setLoadingAction)(false));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 12]]);
  };
};

exports.uploadImageAction = uploadImageAction;

var resetUploadImageAction = function resetUploadImageAction() {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(resetUploadImage());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.resetUploadImageAction = resetUploadImageAction;

var setUploadImageAction = function setUploadImageAction(url, id) {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch(setUploadImage(url, id));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.setUploadImageAction = setUploadImageAction;
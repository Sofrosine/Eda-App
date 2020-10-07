"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

var _reactNative = require("react-native");

var errorHandler = function errorHandler(error) {
  if (error.response) {
    if (error.response.status == 422) {
      Object.entries(error.response.data.data).map(function (data_array, key) {
        data_array[1].map(function (error_data, k) {
          _reactNative.Alert.alert(error_data);
        });
      });
    }
  } else {
    return _reactNative.Alert.alert(error.message);
  }
};

exports.errorHandler = errorHandler;
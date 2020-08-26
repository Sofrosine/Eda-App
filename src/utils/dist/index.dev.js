"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require("./colors");

Object.keys(_colors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _colors[key];
    }
  });
});

var _localstorage = require("./localstorage");

Object.keys(_localstorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _localstorage[key];
    }
  });
});

var _useForm = require("./useForm");

Object.keys(_useForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useForm[key];
    }
  });
});

var _fonts = require("./fonts");

Object.keys(_fonts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fonts[key];
    }
  });
});

var _setDate = require("./setDate");

Object.keys(_setDate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _setDate[key];
    }
  });
});

var _formikPersist = require("./formikPersist");

Object.keys(_formikPersist).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _formikPersist[key];
    }
  });
});
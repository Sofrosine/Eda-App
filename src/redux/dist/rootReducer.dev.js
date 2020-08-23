"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("./Login/reducers"));

var _reducers2 = _interopRequireDefault(require("./Category/reducers"));

var _reducers3 = _interopRequireDefault(require("./UploadImage/reducers"));

var _reducers4 = _interopRequireDefault(require("./AutoComplete/reducers"));

var _reducers5 = _interopRequireDefault(require("./ConvertPlaceID/reducers"));

var _reducers6 = _interopRequireDefault(require("./GetLocation/reducers"));

var _reducers7 = _interopRequireDefault(require("./Province/reducers"));

var _reducers8 = _interopRequireDefault(require("./City/reducers"));

var _reducers9 = _interopRequireDefault(require("./District/reducers"));

var _reducers10 = _interopRequireDefault(require("./GetOrder/reducers"));

var _reducers11 = _interopRequireDefault(require("./CheckEmail/reducers"));

var _reducers12 = _interopRequireDefault(require("./Register/reducers"));

var _reducers13 = _interopRequireDefault(require("./Loading/reducers"));

var _reducers14 = _interopRequireDefault(require("./DetailOrder/reducers"));

var _reducers15 = _interopRequireDefault(require("./AddOrder/reducers"));

var _reducers16 = _interopRequireDefault(require("./RequestVerification/reducers"));

var _reducers17 = _interopRequireDefault(require("./AvailablePayment/reducers"));

var _reducers18 = _interopRequireDefault(require("./BankList/reducers"));

var _reducers19 = _interopRequireDefault(require("./PaymentManual/reducers"));

var _reducers20 = _interopRequireDefault(require("./CancelOrder/reducers"));

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var appReducer = (0, _redux.combineReducers)({
  loginReducer: _reducers["default"],
  categoryReducer: _reducers2["default"],
  uploadImageReducer: _reducers3["default"],
  autoCompleteReducer: _reducers4["default"],
  convertPlaceReducer: _reducers5["default"],
  getLocationReducer: _reducers6["default"],
  provinceReducer: _reducers7["default"],
  cityReducer: _reducers8["default"],
  districtReducer: _reducers9["default"],
  getOrderReducer: _reducers10["default"],
  checkEmailReducer: _reducers11["default"],
  registerReducer: _reducers12["default"],
  loadingReducer: _reducers13["default"],
  detailOrderReducer: _reducers14["default"],
  addOrderReducer: _reducers15["default"],
  requestVerificationReducer: _reducers16["default"],
  availablePaymentReducer: _reducers17["default"],
  bankListReducer: _reducers18["default"],
  paymentManualReducer: _reducers19["default"],
  cancelOrderReducer: _reducers20["default"]
});

var rootReducer = function rootReducer(state, action) {
  if (action.type === 'DELETE_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};

var _default = rootReducer;
exports["default"] = _default;
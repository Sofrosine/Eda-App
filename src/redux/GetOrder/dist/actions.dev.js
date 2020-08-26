"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderPaginationActiveAction = exports.getOrderPaginationInactiveAction = exports.getOrderActiveAction = exports.getOrderInactiveAction = void 0;

var _api = require("../../api");

var _actions = require("../Loading/actions");

var _constants = require("./constants");

var getActiveOrder = function getActiveOrder() {
  return {
    type: _constants.GET_ACTIVE_ORDER
  };
};

var getActiveOrderSuccess = function getActiveOrderSuccess(resActive) {
  return {
    type: _constants.GET_ACTIVE_ORDER_SUCCESS,
    payload: {
      resActive: resActive
    }
  };
};

var getActiveOrderFailed = function getActiveOrderFailed(error) {
  return {
    type: _constants.GET_ACTIVE_ORDER_FAILED,
    payload: {
      error: error
    }
  };
};

var getInActiveOrder = function getInActiveOrder() {
  return {
    type: _constants.GET_INACTIVE_ORDER
  };
};

var getInActiveOrderSuccess = function getInActiveOrderSuccess(resInActive) {
  return {
    type: _constants.GET_INACTIVE_ORDER_SUCCESS,
    payload: {
      resInActive: resInActive
    }
  };
};

var getInActiveOrderFailed = function getInActiveOrderFailed(error) {
  return {
    type: _constants.GET_INACTIVE_ORDER_FAILED,
    payload: {
      error: error
    }
  };
};

var setPageOrder = function setPageOrder() {
  return {
    type: _constants.SET_PAGE_ORDER
  };
};

var resetPageOrder = function resetPageOrder() {
  return {
    type: _constants.RESET_PAGE_ORDER
  };
};

var stopPaginationActiveOrder = function stopPaginationActiveOrder(paginationStatus) {
  return {
    type: _constants.STOP_PAGINATION_ACTIVE_ORDER,
    payload: {
      paginationStatus: paginationStatus
    }
  };
};

var stopPaginationInActiveOrder = function stopPaginationInActiveOrder(paginationStatus) {
  return {
    type: _constants.STOP_PAGINATION_INACTIVE_ORDER,
    payload: {
      paginationStatus: paginationStatus
    }
  };
};

var getOrderInactiveAction = function getOrderInactiveAction() {
  return function _callee(dispatch) {
    var apiReq;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions.setLoadingAction)(true));
            dispatch(resetPageOrder());
            dispatch(getInActiveOrder());
            dispatch(stopPaginationInActiveOrder(true));
            _context.prev = 4;
            _context.next = 7;
            return regeneratorRuntime.awrap((0, _api.api)('get', 'order?page=1'));

          case 7:
            apiReq = _context.sent;
            console.log('eapaiapi', apiReq.data.data.orders.items);
            dispatch(getInActiveOrderSuccess(apiReq.data.data.orders.items));
            dispatch((0, _actions.setLoadingAction)(false));
            _context.next = 18;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](4);
            console.log('error get order inactive', _context.t0);
            dispatch(getInActiveOrderFailed(_context.t0));
            dispatch((0, _actions.setLoadingAction)(false));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 13]]);
  };
};

exports.getOrderInactiveAction = getOrderInactiveAction;

var getOrderActiveAction = function getOrderActiveAction() {
  return function _callee2(dispatch) {
    var apiReq;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch((0, _actions.setLoadingAction)(true));
            dispatch(resetPageOrder());
            dispatch(getActiveOrder());
            dispatch(stopPaginationActiveOrder(true));
            _context2.prev = 4;
            _context2.next = 7;
            return regeneratorRuntime.awrap((0, _api.api)('get', 'order?active=true&page=1'));

          case 7:
            apiReq = _context2.sent;
            console.log('active irder', apiReq);
            dispatch(getActiveOrderSuccess(apiReq.data.data.orders.items));
            dispatch((0, _actions.setLoadingAction)(false));
            _context2.next = 18;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](4);
            console.log('error get order active', _context2.t0);
            dispatch(getActiveOrderFailed(_context2.t0));
            dispatch((0, _actions.setLoadingAction)(false));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[4, 13]]);
  };
};

exports.getOrderActiveAction = getOrderActiveAction;

var getOrderPaginationInactiveAction = function getOrderPaginationInactiveAction() {
  return function _callee3(dispatch, getState) {
    var _getState, getOrderReducer, page, inactiveData, apiReq, arr, newArr, pagArr;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(dispatch(setPageOrder()));

          case 2:
            _getState = getState(), getOrderReducer = _getState.getOrderReducer;
            page = getOrderReducer.page, inactiveData = getOrderReducer.inactiveData;
            dispatch(getInActiveOrder());
            getOrderReducer.isInactivePagination ? dispatch((0, _actions.setLoadingAction)(true)) : dispatch((0, _actions.setLoadingAction)(false));
            _context3.prev = 6;

            if (!getOrderReducer.isInactivePagination) {
              _context3.next = 24;
              break;
            }

            _context3.next = 10;
            return regeneratorRuntime.awrap((0, _api.api)('get', "order?page=".concat(page)));

          case 10:
            apiReq = _context3.sent;
            console.log('inactive api', apiReq);
            _context3.next = 14;
            return regeneratorRuntime.awrap(getOrderReducer.inactiveData);

          case 14:
            arr = _context3.sent;
            _context3.next = 17;
            return regeneratorRuntime.awrap(apiReq.data.data.orders.items);

          case 17:
            newArr = _context3.sent;
            _context3.next = 20;
            return regeneratorRuntime.awrap(arr.concat(newArr));

          case 20:
            pagArr = _context3.sent;
            dispatch(getInActiveOrderSuccess(pagArr));
            dispatch((0, _actions.setLoadingAction)(false));

            if (apiReq.data.data.orders.items.length < 1) {
              dispatch(stopPaginationInActiveOrder(false));
              dispatch((0, _actions.setLoadingAction)(false));
            }

          case 24:
            _context3.next = 31;
            break;

          case 26:
            _context3.prev = 26;
            _context3.t0 = _context3["catch"](6);
            console.log('error get order pagination inactive', _context3.t0);
            dispatch(getInActiveOrderFailed(_context3.t0));
            dispatch((0, _actions.setLoadingAction)(false));

          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[6, 26]]);
  };
};

exports.getOrderPaginationInactiveAction = getOrderPaginationInactiveAction;

var getOrderPaginationActiveAction = function getOrderPaginationActiveAction() {
  return function _callee4(dispatch, getState) {
    var _getState2, getOrderReducer, page, activeData, apiReq, arr, newArr, pagArr;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(dispatch(setPageOrder()));

          case 2:
            _getState2 = getState(), getOrderReducer = _getState2.getOrderReducer;
            page = getOrderReducer.page, activeData = getOrderReducer.activeData;
            dispatch(getActiveOrder());
            getOrderReducer.isActivePagination ? dispatch((0, _actions.setLoadingAction)(true)) : dispatch((0, _actions.setLoadingAction)(false));
            _context4.prev = 6;

            if (!getOrderReducer.isActivePagination) {
              _context4.next = 23;
              break;
            }

            _context4.next = 10;
            return regeneratorRuntime.awrap((0, _api.api)('get', "order?active=true&page=".concat(page)));

          case 10:
            apiReq = _context4.sent;
            _context4.next = 13;
            return regeneratorRuntime.awrap(getOrderReducer.activeData);

          case 13:
            arr = _context4.sent;
            _context4.next = 16;
            return regeneratorRuntime.awrap(apiReq.data.data.orders.items);

          case 16:
            newArr = _context4.sent;
            _context4.next = 19;
            return regeneratorRuntime.awrap(arr.concat(newArr));

          case 19:
            pagArr = _context4.sent;
            dispatch(getActiveOrderSuccess(pagArr));
            dispatch((0, _actions.setLoadingAction)(false));

            if (apiReq.data.data.orders.items.length < 1) {
              dispatch(stopPaginationActiveOrder(false));
              dispatch((0, _actions.setLoadingAction)(false));
            }

          case 23:
            _context4.next = 30;
            break;

          case 25:
            _context4.prev = 25;
            _context4.t0 = _context4["catch"](6);
            console.log('error get order pagination active', _context4.t0);
            dispatch(getActiveOrderFailed(_context4.t0));
            dispatch((0, _actions.setLoadingAction)(false));

          case 30:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[6, 25]]);
  };
};

exports.getOrderPaginationActiveAction = getOrderPaginationActiveAction;
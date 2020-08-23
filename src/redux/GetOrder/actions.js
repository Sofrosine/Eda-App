import {api} from '../../api';
import {setLoadingAction} from '../Loading/actions';
import {
  GET_ACTIVE_ORDER,
  GET_ACTIVE_ORDER_FAILED,
  GET_ACTIVE_ORDER_SUCCESS,
  GET_INACTIVE_ORDER,
  GET_INACTIVE_ORDER_SUCCESS,
  GET_INACTIVE_ORDER_FAILED,
  SET_PAGE_ORDER,
  RESET_PAGE_ORDER,
  STOP_PAGINATION_ACTIVE_ORDER,
  STOP_PAGINATION_INACTIVE_ORDER,
} from './constants';

const getActiveOrder = () => ({
  type: GET_ACTIVE_ORDER,
});

const getActiveOrderSuccess = (resActive) => ({
  type: GET_ACTIVE_ORDER_SUCCESS,
  payload: {resActive},
});

const getActiveOrderFailed = (error) => ({
  type: GET_ACTIVE_ORDER_FAILED,
  payload: {error},
});
const getInActiveOrder = () => ({
  type: GET_INACTIVE_ORDER,
});

const getInActiveOrderSuccess = (resInActive) => ({
  type: GET_INACTIVE_ORDER_SUCCESS,
  payload: {resInActive},
});

const getInActiveOrderFailed = (error) => ({
  type: GET_INACTIVE_ORDER_FAILED,
  payload: {error},
});

const setPageOrder = () => ({
  type: SET_PAGE_ORDER,
});

const resetPageOrder = () => ({
  type: RESET_PAGE_ORDER,
});

const stopPaginationActiveOrder = (paginationStatus) => ({
  type: STOP_PAGINATION_ACTIVE_ORDER,
  payload: {paginationStatus},
});
const stopPaginationInActiveOrder = (paginationStatus) => ({
  type: STOP_PAGINATION_INACTIVE_ORDER,
  payload: {paginationStatus},
});

export const getOrderInactiveAction = () => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(resetPageOrder());
    dispatch(getInActiveOrder());
    dispatch(stopPaginationInActiveOrder(true));
    try {
      const apiReq = await api('get', 'order?page=1');
      console.log('eapaiapi', apiReq.data.data.orders.items);
      dispatch(getInActiveOrderSuccess(apiReq.data.data.orders.items));
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('error get order inactive', error);
      dispatch(getInActiveOrderFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};
export const getOrderActiveAction = () => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(resetPageOrder());
    dispatch(getActiveOrder());
    dispatch(stopPaginationActiveOrder(true));
    try {
      const apiReq = await api('get', 'order?active=true&page=1');
      console.log('active irder', apiReq);
      dispatch(getActiveOrderSuccess(apiReq.data.data.orders.items));
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('error get order active', error);
      dispatch(getActiveOrderFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

export const getOrderPaginationInactiveAction = () => {
  return async (dispatch, getState) => {
    await dispatch(setPageOrder());
    const {getOrderReducer} = getState();
    const {page, inactiveData} = getOrderReducer;
    dispatch(getInActiveOrder());
    getOrderReducer.isInactivePagination
      ? dispatch(setLoadingAction(true))
      : dispatch(setLoadingAction(false));
    try {
      if (getOrderReducer.isInactivePagination) {
        const apiReq = await api('get', `order?page=${page}`);
        console.log('inactive api', apiReq);
        const arr = await getOrderReducer.inactiveData;
        const newArr = await apiReq.data.data.orders.items;
        const pagArr = await arr.concat(newArr);
        dispatch(getInActiveOrderSuccess(pagArr));
        dispatch(setLoadingAction(false));
        if (apiReq.data.data.orders.items.length < 1) {
          dispatch(stopPaginationInActiveOrder(false));
          dispatch(setLoadingAction(false));
        }
      }
    } catch (error) {
      console.log('error get order pagination inactive', error);
      dispatch(getInActiveOrderFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

export const getOrderPaginationActiveAction = () => {
  return async (dispatch, getState) => {
    await dispatch(setPageOrder());
    const {getOrderReducer} = getState();
    const {page, activeData} = getOrderReducer;
    dispatch(getActiveOrder());
    getOrderReducer.isActivePagination
      ? dispatch(setLoadingAction(true))
      : dispatch(setLoadingAction(false));
    try {
      if (getOrderReducer.isActivePagination) {
        const apiReq = await api('get', `order?active=true&page=${page}`);
        const arr = await getOrderReducer.activeData;
        const newArr = await apiReq.data.data.orders.items;
        const pagArr = await arr.concat(newArr);
        dispatch(getActiveOrderSuccess(pagArr));
        dispatch(setLoadingAction(false));
        if (apiReq.data.data.orders.items.length < 1) {
          dispatch(stopPaginationActiveOrder(false));
          dispatch(setLoadingAction(false));
        }
      }
    } catch (error) {
      console.log('error get order pagination active', error);
      dispatch(getActiveOrderFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

import {api} from '../../api';

const {
  GET_REQUEST_ORDER,
  GET_REQUEST_ORDER_SUCCESS,
  GET_REQUEST_ORDER_FAILED,
} = require('./constants');

const requestOrder = () => ({
  type: GET_REQUEST_ORDER,
});

const requestOrderSuccess = (res) => ({
  type: GET_REQUEST_ORDER_SUCCESS,
  payload: {res},
});

const requestOrderFailed = (err) => ({
  type: GET_REQUEST_ORDER_FAILED,
  payload: {err},
});

export const requestOrderAction = () => {
  return async (dispatch) => {
    dispatch(requestOrder());
    try {
      const apiReq = await api('get', 'request-order');
      console.log('apireq get request order', apiReq);
      dispatch(requestOrderSuccess(apiReq.data.data));
    } catch (error) {
      console.log('error get request order', error);
      dispatch(requestOrderFailed(error));
    }
  };
};

import {
  SEARCH_CUSTOMER,
  SEARCH_CUSTOMER_SUCCESS,
  SEARCH_CUSTOMER_FAILED,
} from './constants';
import {errorHandler} from '../../utils';
import {api} from '../../api';

const searchCustomer = () => ({
  type: SEARCH_CUSTOMER,
});

const searchCustomerSuccess = (res) => ({
  type: SEARCH_CUSTOMER_SUCCESS,
  payload: {res},
});

const searchCustomerFailed = (error) => ({
  type: SEARCH_CUSTOMER_FAILED,
  payload: {error},
});

export const searchCustomerAction = (text) => {
  return async (dispatch) => {
    dispatch(searchCustomer());
    try {
      const apiReq = await api('get', `customer?q=${text}`);
      console.log('api req search customer', apiReq);
      dispatch(searchCustomerSuccess(apiReq.data.data));
    } catch (error) {
      console.log('error search customer', error);
      dispatch(searchCustomerFailed(error));
      errorHandler(error);
    }
  };
};

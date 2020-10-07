import {api} from '../../api';
import {
  GET_CUSTOMER,
  GET_CUSTOMER_FAILED,
  GET_CUSTOMER_SUCCESS,
} from './constants';

const getCustomer = () => ({
  type: GET_CUSTOMER,
});

const getCustomerSuccess = (res) => ({
  type: GET_CUSTOMER_SUCCESS,
  payload: {res},
});

const getCustomerFailed = (err) => ({
  type: GET_CUSTOMER_FAILED,
  payload: {err},
});

export const getCustomerAction = () => {
  return async (dispatch) => {
    dispatch(getCustomer());
    try {
      const apiReq = await api('get', 'customer/list');
      console.log('apiReq getCustomer', apiReq);
      dispatch(getCustomerSuccess(apiReq.data));
    } catch (error) {
      console.log('error get customer', error);
      dispatch(getCustomerFailed(error));
    }
  };
};

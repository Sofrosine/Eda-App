import {
  DETAIL_ORDER,
  DETAIL_ORDER_SUCCESS,
  DETAIL_ORDER_FAILED,
} from './constants';
import {api} from '../../api';
import {setLoadingAction} from '../Loading/actions';

const getDetailOrder = () => ({
  type: DETAIL_ORDER,
});

const getDetailOrderSuccess = (res) => ({
  type: DETAIL_ORDER_SUCCESS,
  payload: {res},
});

const getDetailOrderFailed = (error) => ({
  type: DETAIL_ORDER_FAILED,
  payload: {error},
});

export const getDetailOrderAction = (id) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(getDetailOrder()); 
    try {
      const apiReq = await api('get', `order/detail?id=${id}`);
      dispatch(getDetailOrderSuccess(apiReq.data.data));
      console.log('apih detail', apiReq.data.data);
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('get detail order', error);
      dispatch(getDetailOrderFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

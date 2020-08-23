import {
  GET_AVAILABLE_PAYMENT,
  GET_AVAILABLE_PAYMENT_SUCCESS,
  GET_AVAILABLE_PAYMENT_FAILED,
} from './constants';
import {api} from '../../api';
import {setLoadingAction} from '../Loading/actions';

const getAvailablePayment = () => ({
  type: GET_AVAILABLE_PAYMENT,
});

const getAvailablePaymentSuccess = (
  transferDataRes,
  paymentGatewayDataRes,
) => ({
  type: GET_AVAILABLE_PAYMENT_SUCCESS,
  payload: {
    transferDataRes,
    paymentGatewayDataRes,
  },
});

const getAvailablePaymentFailed = (error) => ({
  type: GET_AVAILABLE_PAYMENT_FAILED,
  payload: {error},
});

export const getAvailablePaymentAction = () => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(getAvailablePayment());
    try {
      const apiReq = await api('get', 'available-payment');
      console.log('api req avialablepayment', apiReq);
      dispatch(
        getAvailablePaymentSuccess(
          apiReq.data.data.transfer,
          apiReq.data.data.payment_gateway,
        ),
      );
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('error available payment', error);
      dispatch(getAvailablePaymentFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

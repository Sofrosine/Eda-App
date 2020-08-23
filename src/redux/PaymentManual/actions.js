// pakai akunku juga coba mas
// email: soultanmuh@gmail.com
// p: password

import {
  SET_PAYMENT_MANUAL,
  SET_PAYMENT_MANUAL_SUCCESS,
  SET_PAYMENT_MANUAL_FAILED,
} from './constants';
import {api} from '../../api';
import {setLoadingAction} from '../Loading/actions';

const setPaymentManual = () => ({
  type: SET_PAYMENT_MANUAL,
});

const setPaymentManualSuccess = (res) => ({
  type: SET_PAYMENT_MANUAL_SUCCESS,
  payload: {res},
});

const setPaymentManualFailed = (error) => ({
  type: SET_PAYMENT_MANUAL_FAILED,
  payload: {error},
});

export const setPaymentAction = (form, navigation) => {
  const {
    order_id,
    bank_sender_account_name,
    bank_sender_account_number,
    bank_sender_id,
    bank_receiver_account_name,
    bank_receiver_account_number,
    bank_receiver_id,
    amount,
    transfer_proof_id,
  } = form;
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(setPaymentManual());
    try {
      const apiReq = await api('post', 'upload-manual-transfer', {
        order_id,
        bank_sender_account_name,
        bank_sender_account_number,
        bank_sender_id,
        bank_receiver_account_name,
        bank_receiver_account_number,
        bank_receiver_id,
        amount,
        transfer_proof_id,
      });
      console.log('pay', apiReq);
      dispatch(setLoadingAction(false));
      navigation.replace('OrderVerificationProcess');
    } catch (error) {
      console.log('error payment manual', error);
      dispatch(setPaymentManualFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

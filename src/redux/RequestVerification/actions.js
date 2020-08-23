import {
  SET_REQUEST_VERIFICATION,
  SET_REQUEST_VERIFICATION_SUCCESS,
  SET_REQUEST_VERIFICATION_FAILED,
} from './constants';
import {setLoadingAction} from '../Loading/actions';
import {api} from '../../api';
import {Alert} from 'react-native';

const setRequestVerification = () => ({
  type: SET_REQUEST_VERIFICATION,
});

const setRequestVerificationSuccess = (res) => ({
  type: SET_REQUEST_VERIFICATION_SUCCESS,
  payload: {res},
});

const setRequestVerificationFailed = (error) => ({
  type: SET_REQUEST_VERIFICATION_FAILED,
  payload: {error},
});

export const setRequestVerificationAction = (email) => {
  return async (dispatch) => {
    dispatch(setRequestVerification());
    dispatch(setLoadingAction(true));
    try {
      const apiReq = await api('post', 'auth/request-verify', {
        email,
      });
      console.log('apireq request verification', apiReq);
      Alert.alert(
        'Email belum diverifikasi, kami telah mengirim ulang verifikasi',
      );
      dispatch(setLoadingAction(false));
      dispatch(setRequestVerificationSuccess(apiReq.data));
    } catch (error) {
      console.log('error request verification');
      dispatch(setRequestVerificationFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

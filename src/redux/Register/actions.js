import {
  SET_REGISTER,
  SET_REGISTER_FAILED,
  SET_REGISTER_SUCCESS,
} from './constants';
import {api} from '../../api';
import Axios from 'axios';
import {ToastAndroid} from 'react-native';
import {setLoadingAction} from '../Loading/actions';

const setRegister = () => ({
  type: SET_REGISTER,
}); 

const setRegisterFailed = (error) => ({
  type: SET_REGISTER_FAILED,
  payload: {error},
});

const setRegisterSuccess = (res) => ({
  type: SET_REGISTER_SUCCESS,
  payload: {res},
});

export const setRegisterAction = (form, navigation) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(setRegister());
    try {
      //   const apiReq = await api('post', 'auth/register', form);
      console.log('formm', form);
      const apiReq = await Axios.post(
        'https://calasteo.tech/api/merchant/auth/register',
        form,
      );
      dispatch(setLoadingAction(false));
      dispatch(setRegisterSuccess(apiReq));
      ToastAndroid.show(apiReq.data.message, 3000);
      navigation.replace('RegisterSuccess');
    } catch (error) {
      console.log('error', error);
      dispatch(setRegisterFailed(error));
      ToastAndroid.show(
        'Data yang diberikan salah, mohon koreksi kembali data Anda',
        3000,
      );
      dispatch(setLoadingAction(false));
    }
  };
};

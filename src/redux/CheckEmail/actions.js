import {
  CHECK_EMAIL,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILED,
  SET_CHECK_EMAIL_ERROR,
} from './constants';
import {api} from '../../api';
import {ToastAndroid} from 'react-native';
import {setLoadingAction} from '../Loading/actions';
import { setRegisterAction } from '../Register/actions';

const checkEmail = () => ({
  type: CHECK_EMAIL,
});
const checkEmailSuccess = (res) => ({
  type: CHECK_EMAIL_SUCCESS,
  payload: {res},
});
const checkEmailFailed = (error) => ({
  type: CHECK_EMAIL_FAILED,
  payload: {error},
});
const setCheckEmailError = (errorStatus) => ({
  type: SET_CHECK_EMAIL_ERROR,
  payload: {errorStatus},
});

export const checkEmailAction = (form, navigation) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(checkEmail());
    try {
      const formData = new FormData();
      await formData.append('email', form.email);
      const apiReq = await api('post', 'auth/check-email', formData, true);
      dispatch(checkEmailSuccess(apiReq.data));
      const {name, email, password, password_confirmation} = form;
      // navigation.navigate('RegisterDetail', {
      //   name,
      //   email,
      //   password,
      //   password_confirmation,
      // });
      dispatch(
        setRegisterAction(
          {
            name,
            email,
            password,
            password_confirmation,
          },
          navigation,
        ),
      );
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('error check email', error);
      ToastAndroid.show('Email telah dipakai', 2000);
      dispatch(checkEmailFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

export const setCheckEmailErrorAction = (status) => {
  return async (dispatch) => {
    dispatch(setCheckEmailError(status));
  };
};

import {
  SET_LOGIN,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_FAILED,
  SET_LOGIN_ERROR,
} from './constants';
import {api} from '../../api';
import {getData, storeData} from '../../utils';
import Axios from 'axios';
import {Alert} from 'react-native';
import {setLoadingAction} from '../Loading/actions';
import {setRequestVerificationAction} from '../RequestVerification/actions';

const setLogin = () => ({
  type: SET_LOGIN,
});

const setLoginSuccess = (res) => ({
  type: SET_LOGIN_SUCCESS,
  payload: {res},
});

const setLoginFailed = (error) => ({
  type: SET_LOGIN_FAILED,
  payload: {error},
});

const setLoginError = (errorStatus) => ({
  type: SET_LOGIN_ERROR,
  payload: {errorStatus},
});
const getUser = async () => {
  const imeiToken = await getData('imeiToken');
  let fcmToken = await getData('fcmToken');

  return {
    imeiToken,
    fcmToken,
  };
};

export const setLoginAction = (email, password, navigation) => {
  return async (dispatch) => {
    const dataUser = await getUser();
    dispatch(setLoadingAction(true));
    dispatch(setLogin());
    try {
      const apiReq = await Axios.post(
        'https://calasteo.tech/api/merchant/auth/login',
        {
          email,
          password,
          imei: dataUser.imeiToken,
          firebase_token: dataUser.fcmToken,
        },
      );
      console.log('apireqq', apiReq);
      if (apiReq.data.data.user.email_verified) {
        console.log('verified');
        const token = await apiReq.data.data.auth.access_token;
        const user = await apiReq.data.data.user;
        const storeToken = await storeData('@user_token', token);
        const storeUser = await storeData('@user_data', user);
        dispatch(setLoginSuccess(apiReq));
        navigation.replace('HomeDrawer');
      } else if (!apiReq.data.data.user.email_verified) {
        dispatch(setLoginSuccess(apiReq));
        dispatch(setRequestVerificationAction(email));
      } else {
        dispatch(setLoginSuccess(apiReq));
        Alert.alert(apiReq.data.message);
      }
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('error', error.message);
      dispatch(setLoginFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

export const setLoginErrorAction = (status) => {
  return async (dispatch) => {
    dispatch(setLoginError(status));
  };
};

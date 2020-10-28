import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
} from './constants';
import {api} from '../../api';
import {Alert, ToastAndroid} from 'react-native';
import {storeData} from '../../utils';

// [----PROFILE-----]
const getProfile = () => ({
  type: GET_PROFILE,
});

const getProfileSuccess = (res) => ({
  type: GET_PROFILE_SUCCESS,
  payload: {res},
});

const getProfileFailed = (error) => ({
  type: GET_PROFILE_FAILED,
  payload: {error},
});

export const getProfileAction = () => {
  return async (dispatch) => {
    dispatch(getProfile());
    try {
      const apiReq = await api('get', 'me');
      console.log('apireq get profile ', apiReq);
      dispatch(getProfileSuccess(apiReq.data.data));
      storeData('@user_data', apiReq.data.data);
    } catch (error) {
      console.log('error get profile', error);
      dispatch(getProfileFailed(error));
    }
  };
};

// [_---PASSWORD-----_]
const updatePassword = () => ({
  type: UPDATE_PASSWORD,
});

const updatePasswordSuccess = (res) => ({
  type: UPDATE_PASSWORD_SUCCESS,
  payload: {res},
});

const updatePasswordFailed = (error) => ({
  type: UPDATE_PASSWORD_FAILED,
  payload: {error},
});

export const updatePasswordAction = (
  current_password,
  password,
  password_confirmation,
  navigation,
) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append('current_password', current_password);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);
    dispatch(updatePassword());
    try {
      const apiReq = await api('post', 'change-password', formData);
      console.log('apireq update password ', apiReq);
      if (apiReq.data.success) {
        dispatch(updatePasswordSuccess(apiReq.data));
        navigation.goBack();
        ToastAndroid.show(apiReq.data.message, 2000);
      } else {
        dispatch(updatePasswordSuccess(apiReq.data));
        Alert.alert(apiReq.data.message);
      }
    } catch (error) {
      console.log('error update password', error);
      dispatch(updatePasswordFailed(error));
    }
  };
};

//   [=====UPDATE PROFILE=====]

const updateProfile = () => ({
  type: UPDATE_PROFILE,
});

const updateProfileSuccess = (res) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: {res},
});

const updateProfileFailed = (error) => ({
  type: UPDATE_PROFILE_FAILED,
  payload: {error},
});

export const updateProfileAction = (formData, navigation) => {
  return async (dispatch) => {
    dispatch(updateProfile());
    try {
      console.log('formdata profile ', formData);
      const apiReq = await api('post', 'me', formData);
      console.log('apireq update profile ', apiReq);
      if (apiReq.data.success) {
        dispatch(updateProfileSuccess(apiReq.data));
        navigation.goBack();
        dispatch(getProfileAction());
        ToastAndroid.show(apiReq.data.message, 2000);
      } else {
        dispatch(updateProfileSuccess(apiReq.data));
        Alert.alert(apiReq.data.message);
      }
    } catch (error) {
      console.log('error update profile', error);
      dispatch(updateProfileFailed(error));
    }
  };
};

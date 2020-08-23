import Axios from 'axios';
import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAILED,
  UPLOAD_IMAGE_SUCCESS,
  RESET_UPLOAD_IMAGE,
  SET_UPLOAD_IMAGE,
} from './constants';
import {setLoadingAction} from '../Loading/actions';

const uploadImage = () => ({
  type: UPLOAD_IMAGE,
});

const uploadImageSuccess = (res) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: {res},
});

const uploadImageFailed = (error) => ({
  type: UPLOAD_IMAGE_FAILED,
  payload: {error},
});

const resetUploadImage = () => ({
  type: RESET_UPLOAD_IMAGE,
});

const setUploadImage = (url,id) => ({
  type: SET_UPLOAD_IMAGE,
  payload: {url,id},
});

export const uploadImageAction = (formData) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    console.log('formdatahh', formData);
    dispatch(uploadImage());
    try {
      const apiReq = await Axios.post(
        'http://178.128.212.200/api/merchant/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // const apiReq = await api('post', 'image/upload', formData, true);
      console.log('apiReqq photo', apiReq);
      dispatch(uploadImageSuccess(apiReq.data.data));
      dispatch(setLoadingAction(false));
    } catch (error) {
      console.log('error image', error);
      dispatch(uploadImageFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

export const resetUploadImageAction = () => {
  return async (dispatch) => {
    dispatch(resetUploadImage());
  };
};

export const setUploadImageAction = (url,id) => {
  return async (dispatch) => {
    dispatch(setUploadImage(url,id));
  };
};

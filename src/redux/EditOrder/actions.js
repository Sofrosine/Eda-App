import {EDIT_ORDER, EDIT_ORDER_SUCCESS, EDIT_ORDER_FAILED} from './constants';
import {api} from '../../api';
import Axios from 'axios';
import {Alert} from 'react-native';
import {setLoadingAction} from '../Loading/actions';
import {resetUploadImageAction} from '../UploadImage/actions';

const editOrder = () => ({
  type: EDIT_ORDER,
});

const editOrderSuccess = (res) => ({
  type: EDIT_ORDER_SUCCESS,
  payload: {res},
});

const editOrderFailed = (error) => ({
  type: EDIT_ORDER_FAILED,
  payload: {error},
});

export const editOrderAction = (form, navigation) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(editOrder());
    const {
      id,
      schedule,
      receiver_name,
      receiver_phone,
      receiver_address,
      receiver_latitude,
      receiver_longitude,
      district_id,
      payment_method,
    } = form;
    const {
      product_name,
      product_description,
      product_height,
      product_weight,
      product_length,
      product_width,
      category_id,
      product_image_id,
    } = form.details[0];
    try {
      console.log(form)
      const apiReq = await api('post', 'order/update', {
        id,
        schedule,
        receiver_name,
        receiver_phone,
        receiver_address,
        receiver_latitude,
        receiver_longitude,
        district_id,
        payment_method,
        details: [
          {
            product_name,
            product_description,
            product_height,
            product_weight,
            product_length,
            product_width,
            category_id,
            product_image_id,
          },
        ],
      });
      console.log('edit broo', apiReq);
      dispatch(editOrderSuccess(apiReq));
      dispatch(setLoadingAction(false));
      navigation.replace('DetailOrder', {id: apiReq.data.data.id});
      dispatch(resetUploadImageAction());
    } catch (error) {
      console.log('error edit Order', error);
      dispatch(editOrderFailed(error));
      Alert.alert('Mohon koreksi data Anda atau coba beberapa saat lagi');
      dispatch(setLoadingAction(false));
    }
  };
};

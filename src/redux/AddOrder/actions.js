import {ADD_ORDER, ADD_ORDER_SUCCESS, ADD_ORDER_FAILED} from './constants';
import {api} from '../../api';
import Axios from 'axios';
import {Alert} from 'react-native';
import {setLoadingAction} from '../Loading/actions';
import {resetUploadImageAction} from '../UploadImage/actions';
import {errorHandler} from '../../utils';

const addOrder = () => ({
  type: ADD_ORDER,
});

const addOrderSuccess = (res) => ({
  type: ADD_ORDER_SUCCESS,
  payload: {res},
});

const addOrderFailed = (error) => ({
  type: ADD_ORDER_FAILED,
  payload: {error},
});

export const addOrderAction = (form, navigation, request_order_id) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(addOrder());
    const {
      schedule,
      receiver_name,
      receiver_phone,
      receiver_address,
      receiver_latitude,
      receiver_longitude,
      district_id,
      payment_method,
    } = form;
    console.log('shshshs', schedule);
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
      const dataWithRequest = {
        request_order_id,
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
      };
      const dataNoRequest = {
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
      };
      const apiReq = await api(
        'post',
        'order',
        request_order_id ? dataWithRequest : dataNoRequest,
      );
      console.log('apiREQQQ', apiReq);
      dispatch(addOrderSuccess(apiReq));
      dispatch(setLoadingAction(false));
      Alert.alert(
        'Apakah Anda ingin menambah order?',
        '',
        [
          {
            text: 'Tidak',
            onPress: () => {
              dispatch(resetUploadImageAction());
              navigation.replace('CreateOrder2', {
                item: apiReq.data.data.request_order_id,
                request_order_id: apiReq.data.data.request_order_id.id,
              });
            },
            style: 'cancel',
          },
          {
            text: 'Ya',
            onPress: () => {
              dispatch(resetUploadImageAction());
              navigation.replace('CreateOrder', {
                request_order_id: apiReq.data.data.request_order_id.id,
              });
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log('error add Order', error);
      dispatch(addOrderFailed(error));
      Alert.alert('Mohon koreksi data Anda atau coba beberapa saat lagi');
      dispatch(setLoadingAction(false));
      // errorHandler(error);
    }
  };
};

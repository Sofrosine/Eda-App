import {
  CANCEL_ORDER,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILED,
} from './constants';
import {setLoadingAction} from '../Loading/actions';
import {Alert, ToastAndroid} from 'react-native';
import {api} from '../../api';

const cancelOrder = () => ({
  type: CANCEL_ORDER,
});

const cancelOrderSuccess = (res) => ({
  type: CANCEL_ORDER_SUCCESS,
  payload: {res},
});

const cancelOrderFailed = (error) => ({
  type: CANCEL_ORDER_FAILED,
  payload: {error},
});

export const cancelOrderAction = (id, navigation) => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(cancelOrder());
    try {
      const apiReq = await api('post', 'order/delete', {
        id,
      });
      console.log('delete successs', apiReq);
      dispatch(cancelOrderSuccess(apiReq));
      ToastAndroid.show('Berhasil membatalkan order', 2000);
      navigation.replace('HomeDrawer');
    } catch (error) {
      console.log('error cancel', error);
      dispatch(cancelOrderFailed(error));
      Alert.alert('Gagal membatalkan order');
      dispatch(setLoadingAction(false));
    }
  };
};

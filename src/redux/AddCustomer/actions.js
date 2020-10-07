import {
  ADD_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILED,
} from './constants';
import {Alert, ToastAndroid} from 'react-native';
import {api} from '../../api';
import {setLoadingAction} from '../Loading/actions';
import {getCustomerAction} from '../GetCustomer/actions';

const addCustomer = () => ({
  type: ADD_CUSTOMER,
});
const addCustomerSuccess = (res) => ({
  type: ADD_CUSTOMER_SUCCESS,
  payload: {res},
});
const addCustomerFailed = (err) => ({
  type: ADD_CUSTOMER_FAILED,
  payload: {err},
});

export const addCustomerAction = (form, navigation) => {
  return async (dispatch, getState) => {
    const {customer_name, customer_phone} = form;
    const state = getState();
    const {latitude, longitude} = state.getLocationReducer;
    const {selectedData} = state.autoCompleteReducer;
    console.log('statttt', state);
    dispatch(setLoadingAction(true));
    dispatch(addCustomer());
    try {
      const apiReq = await api('post', 'add-customer', {
        customer_name,
        customer_phone,
        customer_address: selectedData,
        customer_latitude: latitude,
        customer_longitude: longitude,
      });
      console.log('apireq add customer', apiReq);
      dispatch(addCustomerSuccess(apiReq.data));
      dispatch(setLoadingAction(false));
      ToastAndroid.show('Berhasil menambahkan customer', 2000);
      navigation.goBack();
      dispatch(getCustomerAction());
    } catch (error) {
      console.log('error add customer action', error);
      Alert.alert('Gagal menambahkan data customer, silahkan coba lagi');
      dispatch(addCustomerFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

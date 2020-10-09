// pakai akunku juga coba mas
// email: soultanmuh@gmail.com
// p: password

import {
  SET_PAYMENT_MANUAL,
  SET_PAYMENT_MANUAL_SUCCESS,
  SET_PAYMENT_MANUAL_FAILED,
} from './constants';
import {api} from '../../api';
import {setLoadingAction} from '../Loading/actions';
import Axios from 'axios';
import {getData} from '../../utils';

const setPaymentManual = () => ({
  type: SET_PAYMENT_MANUAL,
});

const setPaymentManualSuccess = (res) => ({
  type: SET_PAYMENT_MANUAL_SUCCESS,
  payload: {res},
});

const setPaymentManualFailed = (error) => ({
  type: SET_PAYMENT_MANUAL_FAILED,
  payload: {error},
});

const getUser = async () => {
  const token = await getData('@user_token');
  const location = await getData('@user_location');
  const phone = await getData('@user_phone');
  return {
    token,
    location,
    phone,
  };
};

export const setPaymentAction = (form, navigation) => {
  const {
    request_order_id,
    bank_sender_account_name,
    bank_sender_account_number,
    bank_sender_id,
    bank_receiver_account_name,
    bank_receiver_account_number,
    bank_receiver_id,
    amount,
    transfer_proof_id,
  } = form;
  return async (dispatch) => {
    const dataUser = await getUser();
    const formData = new FormData();
    formData.append('request_order_id', request_order_id);
    formData.append('bank_sender_account_name', bank_sender_account_name);
    formData.append('bank_sender_account_number', bank_sender_account_number);
    formData.append('bank_sender_id', bank_sender_id);
    formData.append('bank_receiver_account_name', bank_receiver_account_name);
    formData.append(
      'bank_receiver_account_number',
      bank_receiver_account_number,
    ); 
    formData.append('bank_receiver_id', bank_receiver_id);
    formData.append('amount', amount);
    formData.append('transfer_proof_id', transfer_proof_id);
    dispatch(setLoadingAction(true));
    dispatch(setPaymentManual());
    try {
      // const apiReq = await api('post', 'upload-manual-transfer', formData);
      const apiReq = await Axios.post(
        'https://calasteo.tech/api/merchant/upload-manual-transfer',
        formData,
        {
          headers: {
            Authorization: `Bearer ${dataUser.token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('pay', apiReq);
      dispatch(setLoadingAction(false));
      navigation.replace('OrderVerificationProcess');
    } catch (error) {
      console.log('error payment manual', error);
      dispatch(setPaymentManualFailed(error));
      dispatch(setLoadingAction(false));
    }
  };
};

// import {ADD_ORDER, ADD_ORDER_SUCCESS, ADD_ORDER_FAILED} from './constants';
// import {api} from '../../api';
// import Axios from 'axios';
// import {Alert} from 'react-native';
// import {setLoadingAction} from '../Loading/actions';
// import {resetUploadImageAction} from '../UploadImage/actions';
// import {getData} from '../../utils';

// const addOrder = () => ({
//   type: ADD_ORDER,
// });

// const addOrderSuccess = (res) => ({
//   type: ADD_ORDER_SUCCESS,
//   payload: {res},
// });

// const addOrderFailed = (error) => ({
//   type: ADD_ORDER_FAILED,
//   payload: {error},
// });

// const getUser = async () => {
//   const token = await getData('@user_token');
//   const location = await getData('@user_location');
//   const phone = await getData('@user_phone');
//   return {
//     token,
//     location,
//     phone,
//   };
// };

// export const addOrderAction = (form, navigation) => {
//   return async (dispatch) => {
//     const {
//       schedule,
//       receiver_name,
//       receiver_phone,
//       receiver_address,
//       receiver_latitude,
//       receiver_longitude,
//       district_id,
//       payment_method,
//     } = form;
//     const dataUser = await getUser();
//     const formData = new FormData();
//     formData.append('schedule', '2020-10-20');
//     formData.append('receiver_name', receiver_name);
//     formData.append('receiver_phone', receiver_phone);
//     formData.append('receiver_address', receiver_address);
//     formData.append('receiver_latitude', receiver_latitude);
//     formData.append('receiver_longitude', receiver_longitude);
//     formData.append('district_id', district_id);
//     formData.append('payment_method', payment_method);
//     formData.append('details', form.details);
//     console.log('formDAta', formData);
//     dispatch(setLoadingAction(true));
//     dispatch(addOrder());
//     try {
//       // const apiReq = await api('post', 'order', formData);
//       const apiReq = await Axios.post(
//         'https://calasteo.tech/api/merchant/order',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${dataUser.token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );
//       console.log('apiREQQQ', apiReq);
//       dispatch(addOrderSuccess(apiReq));
//       dispatch(setLoadingAction(false));
//       navigation.replace('CreateOrder2', {order_id: apiReq.data.data.id});
//       dispatch(resetUploadImageAction());
//     } catch (error) {
//       console.log('error add Order', error);
//       dispatch(addOrderFailed(error));
//       Alert.alert('Mohon koreksi data Anda atau coba beberapa saat lagi');
//       dispatch(setLoadingAction(false));
//     }
//   };
// };

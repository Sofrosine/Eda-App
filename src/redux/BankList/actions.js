import {
  GET_BANK_LIST,
  GET_BANK_LIST_SUCCESS,
  GET_BANK_LIST_FAILED,
  SET_BANK_LIST,
} from './constants';
import {api} from '../../api';

const getBankList = () => ({
  type: GET_BANK_LIST,
});

const getBankListSuccess = (res, selectedBank) => ({
  type: GET_BANK_LIST_SUCCESS,
  payload: {res, selectedBank},
});

const getBankListFailed = (error) => ({
  type: GET_BANK_LIST_FAILED,
  payload: {error},
});

const setBankList = (newSelectedBank) => ({
  type: SET_BANK_LIST,
  payload: {newSelectedBank},
});

export const getBankListAction = () => {
  return async (dispatch) => {
    dispatch(getBankList());
    let arr = [{name: 'Pilih Jenis Rekening', id: 'placeholder'}];
    try {
      const apiReq = await api('get', `bank`);
      arr = [...[...arr], ...[...apiReq.data.data]];
      dispatch(getBankListSuccess(arr, apiReq.data.data[0].name));
    } catch (error) {
      console.log('error BankList', error);
      dispatch(getBankListFailed(error));
    }
  };
};

export const setBankListAction = (val) => {
  return async (dispatch) => {
    dispatch(setBankList(val));
  };
};

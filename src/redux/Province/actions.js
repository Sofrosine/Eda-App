import {
  GET_PROVINCE,
  GET_PROVINCE_SUCCESS,
  GET_PROVINCE_FAILED,
  SET_PROVINCE,
  SET_ONLY_PROVINCE,
  GET_ONLY_PROVINCE,
} from './constants';
import {api} from '../../api';
import {getCityAction, setCityAction, resetCityAction} from '../City/actions';
import {resetDistrictAction} from '../District/actions';

const getProvince = () => ({
  type: GET_PROVINCE,
});

const getProvinceSuccess = (res, selectedProvince) => ({
  type: GET_PROVINCE_SUCCESS,
  payload: {res, selectedProvince},
});

const getProvinceFailed = (error) => ({
  type: GET_PROVINCE_FAILED,
  payload: {error},
});

const setProvince = (newSelectedProvince) => ({
  type: SET_PROVINCE,
  payload: {newSelectedProvince},
});
const getOnlyProvinceSuccess = (onlyRes, selectedOnlyProvince) => ({
  type: GET_ONLY_PROVINCE,
  payload: {onlyRes, selectedOnlyProvince},
});

export const getProvinceAction = (purpose) => {
  return async (dispatch) => {
    dispatch(getProvince());
    let arr = [{name: 'Pilih Provinsi', id: 'placeholder'}];
    try {
      const apiReq = await api('get', `province?purpose=${purpose}`);
      arr = [...[...arr], ...[...apiReq.data.data]];
      dispatch(getProvinceSuccess(arr, apiReq.data.data[0].name));
    } catch (error) {
      console.log('error province', error);
      dispatch(getProvinceFailed(error));
    }
  };
};

export const setProvinceAction = (val, type = 'register') => {
  return async (dispatch) => {
    dispatch(setProvince(val));
    console.log('avalal', val);
    if (val !== 'placeholder') {
      dispatch(getCityAction(val, type));
    } else {
      dispatch(resetCityAction());
      dispatch(resetDistrictAction());
    }
  };
};

export const getOnlyProvinceAction = (purpose, id) => {
  return async (dispatch) => {
    dispatch(getProvince());
    try {
      const apiReq = await api('get', `province?purpose=${purpose}`);
      let arr = apiReq.data.data
      let selectedArr = arr.filter(item => Number(item.id) === Number(id))
      dispatch(getOnlyProvinceSuccess(arr, selectedArr[0].id));
    } catch (error) {
      console.log('error province', error);
      dispatch(getProvinceFailed(error));
    }
  };
};

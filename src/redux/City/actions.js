import {
  GET_CITY,
  GET_CITY_SUCCESS,
  GET_CITY_FAILED,
  SET_CITY,
  RESET_CITY,
  GET_ONLY_CITY,
} from './constants';
import {api} from '../../api';
import {getDistrictAction, resetDistrictAction} from '../District/actions';

const getCity = () => ({
  type: GET_CITY,
});

const getCitySuccess = (res) => ({
  type: GET_CITY_SUCCESS,
  payload: {res},
});

const getCityFailed = (error) => ({
  type: GET_CITY_FAILED,
  payload: {error},
});

const setCity = (newSelectedCity) => ({
  type: SET_CITY,
  payload: {newSelectedCity},
});

const resetCity = () => ({
  type: RESET_CITY,
});
const getOnlyCitySuccess = (onlyRes, selectedOnlyCity) => ({
  type: GET_ONLY_CITY,
  payload: {onlyRes, selectedOnlyCity},
});

export const getCityAction = (province_id, purpose) => {
  return async (dispatch) => {
    dispatch(getCity());
    let arr = [{id: 'placeholder', name: 'Pilih Kota'}];
    try {
      const apiReq = await api(
        'get',
        `city?province_id=${province_id}&purpose=${purpose}`,
      );
      arr = [...[...arr], ...[...apiReq.data.data]];
      dispatch(getCitySuccess(arr));
      dispatch(setCity(apiReq.data.data[0].name));
    } catch (error) {
      console.log('error province', error);
      dispatch(getCityFailed(error));
    }
  };
};

export const setCityAction = (val, type = 'register') => {
  return async (dispatch) => {
    dispatch(setCity(val));
    console.log('avalal', typeof val);
    if (val !== 'placeholder') {
      dispatch(getDistrictAction(val, type));
    } else {
      dispatch(resetDistrictAction());
    }
  };
};

export const resetCityAction = (val) => {
  return async (dispatch) => {
    dispatch(resetCity());
  };
};

export const getOnlyCityAction = (purpose, province_id, city_id) => {
  return async (dispatch) => {
    dispatch(getCity());
    try {
      const apiReq = await api(
        'get',
        `city?province_id=${province_id}&purpose=${purpose}`,
      );
      let arr = apiReq.data.data;
      let selectedArr = arr.filter((item) => Number(item.id) === Number(city_id));
      dispatch(getOnlyCitySuccess(arr, selectedArr[0].id));
    } catch (error) {
      console.log('error city', error);
      dispatch(getCityFailed(error));
    }
  };
};

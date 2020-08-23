import {
  GET_DISTRICT,
  GET_DISTRICT_FAILED,
  GET_DISTRICT_SUCCESS,
  RESET_DISTRICT,
  SET_DISTRICT,
  GET_ONLY_DISTRICT,
} from './constants';
import {api} from '../../api';

const getDistrict = () => ({
  type: GET_DISTRICT,
});

const getDistrictSuccess = (res) => ({
  type: GET_DISTRICT_SUCCESS,
  payload: {res},
});

const getDistrictFailed = (error) => ({
  type: GET_DISTRICT_FAILED,
  payload: {error},
});

const setDistrict = (newSelectedDistrict) => ({
  type: SET_DISTRICT,
  payload: {newSelectedDistrict},
});

const resetDistrict = () => ({
  type: RESET_DISTRICT,
});

const getOnlyDistrictSuccess = (onlyRes, selectedOnlyDistrict) => ({
  type: GET_ONLY_DISTRICT,
  payload: {onlyRes, selectedOnlyDistrict},
});

export const getDistrictAction = (city_id, purpose) => {
  return async (dispatch) => {
    dispatch(getDistrict());
    let arr = [{id: 'placeholder', name: 'Pilih Distrik'}];
    try {
      const apiReq = await api(
        'get',
        `district?city_id=${city_id}&purpose=${purpose}`,
      );
      arr = [...[...arr], ...[...apiReq.data.data]];
      dispatch(getDistrictSuccess(arr));
      dispatch(setDistrict(arr[0].id));
    } catch (error) {
      console.log('error district', error);
      dispatch(getDistrictFailed(error));
    }
  };
};

export const setDistrictAction = (val) => {
  return async (dispatch) => {
    dispatch(setDistrict(val));
    console.log('avalal', val);
  };
};

export const resetDistrictAction = (val) => {
  return async (dispatch) => {
    dispatch(resetDistrict());
  };
};

export const getOnlyDistrictAction = (purpose, city_id, district_id) => {
  return async (dispatch) => {
    dispatch(getDistrict());
    try {
      const apiReq = await api(
        'get',
        `district?city_id=${city_id}&purpose=${purpose}`,
      );
      let arr = apiReq.data.data;
      let selectedArr = arr.filter(
        (item) => Number(item.id) === Number(district_id),
      );
      dispatch(getOnlyDistrictSuccess(arr, selectedArr[0].id));
    } catch (error) {
      console.log('error city', error);
      dispatch(getDistrictFailed(error));
    }
  };
};

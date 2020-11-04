import Axios from 'axios';
import {Alert, Platform, ToastAndroid} from 'react-native';
import {selectAutoCompleteVersaAction} from '../AutoComplete/actions';
import { changeVersaStatusAction } from '../VersaStatus/actions';
import {
  SET_LOCATION_MOVE,
  SET_LOCATION_MOVE_FAILED,
  SET_LOCATION_MOVE_SUCCESS,
} from './constants';
const API_KEY = 'AIzaSyDKqZZCb-EQdlnZlGAicHwHIrouAW2At-8';

const setLocationMove = () => ({
  type: SET_LOCATION_MOVE,
});
const setLocationMoveFailed = (error) => ({
  type: SET_LOCATION_MOVE_FAILED,
  payload: {error},
});
const setLocationMoveSuccess = (res, latitude, longitude) => ({
  type: SET_LOCATION_MOVE_SUCCESS,
  payload: {res, latitude, longitude},
});

export const setLocationMoveAction = (latitude, longitude) => {
  return async (dispatch) => {
    dispatch(setLocationMove());
    try {
      const apiReq = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
      );
      console.log('move location', apiReq);
      dispatch(setLocationMoveSuccess(apiReq.data, latitude, longitude));
      dispatch(selectAutoCompleteVersaAction(apiReq.data.results[0]));
      dispatch(changeVersaStatusAction(true));
    } catch (error) {
      console.log('error move location', error);
      dispatch(setLocationMoveFailed(error));
      Platform.OS === 'ios'
        ? Alert.alert('Gagal memproses lokasi')
        : ToastAndroid.show('Gagal memproses lokasi', 2000);
    }
  };
};

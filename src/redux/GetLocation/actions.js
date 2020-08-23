import {
  GET_LOCATION,
  GET_LOCATION_FAILED,
  GET_LOCATION_SUCCESS,
} from './constants';
import Geolocation from '@react-native-community/geolocation';

const getLocation = () => ({
  type: GET_LOCATION,
});

const getLocationFailed = (error) => ({
  type: GET_LOCATION_FAILED,
  payload: {error},
});

const getLocationSuccess = (latitude, longitude) => ({
  type: GET_LOCATION_SUCCESS,
  payload: {latitude, longitude},
});

export const getLocationAction = () => {
  return async (dispatch) => {
    dispatch(getLocation());
    Geolocation.getCurrentPosition(
      async (res) => {
        console.log('ress', res);
        dispatch(
          getLocationSuccess(
            Number(res.coords.latitude),
            Number(res.coords.longitude),
          ),
        );
      },
      (error) => dispatch(getLocationFailed(error)),
      {
        enableHighAccuracy: true,
        distanceFilter: 2000,
      },
    );
  };
};

export const setLocationAction = (latitude, longitude) => {
  return async (dispatch) => {
    dispatch(getLocation());
    dispatch(getLocationSuccess(latitude, longitude));
  };
};

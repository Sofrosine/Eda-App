import {
  SET_CONVERT_PLACE,
  SET_CONVERT_PLACE_SUCCESS,
  SET_CONVERT_PLACE_FAILED,
} from './constants';
import Axios from 'axios';
import {setLocationAction} from '../GetLocation/actions';
const apiKey = 'AIzaSyD3rfV14WCZO6iNH5iX37OltWufEx7AK4k';

const setConvertPlace = () => ({
  type: SET_CONVERT_PLACE,
});

const setConvertPlaceSuccess = (res) => ({
  type: SET_CONVERT_PLACE_SUCCESS,
  payload: {res},
});

const setConvertPlaceFailed = (error) => ({
  type: SET_CONVERT_PLACE_FAILED,
  payload: {error},
});

export const setConvertPlaceAction = (place_id) => {
  return async (dispatch) => {
    dispatch(setConvertPlace());
    try {
      const apiReq = await Axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`,
      );
      const location = await apiReq.data.result.geometry.location;
      console.log('apiREQQ CONVERT', location.lat, location.lng);
      dispatch(setConvertPlaceSuccess(apiReq.data.result));
      dispatch(setLocationAction(location.lat, location.lng));
    } catch (error) {
      console.log('error convert', error);
      dispatch(setConvertPlaceFailed(error));
    }
  };
};

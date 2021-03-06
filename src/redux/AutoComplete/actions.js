import {
  SET_AUTO_COMPLETE,
  SET_AUTO_COMPLETE_SUCCESS,
  SET_AUTO_COMPLETE_FAILED,
  SELECT_AUTO_COMPLETE,
  SHOW_AUTO_COMPLETE,
  SELECT_AUTO_COMPLETE_VERSA,
} from './constants';
import Axios from 'axios';
import {setConvertPlaceAction} from '../ConvertPlaceID/actions';
import {setLocationAction} from '../GetLocation/actions';
import { changeVersaStatusAction } from '../VersaStatus/actions';

const apiKey = 'AIzaSyDKqZZCb-EQdlnZlGAicHwHIrouAW2At-8';

const setAutoComplete = () => ({
  type: SET_AUTO_COMPLETE,
});

const setAutoCompleteSuccess = (res) => ({
  type: SET_AUTO_COMPLETE_SUCCESS,
  payload: {res},
});

const setAutoCompleteFailed = (error) => ({
  type: SET_AUTO_COMPLETE_FAILED,
  payload: {error},
});

const selectAutoComplete = (resSelected) => ({
  type: SELECT_AUTO_COMPLETE,
  payload: {resSelected},
});

const selectAutoCompleteVersa = (resSelected) => ({
  type: SELECT_AUTO_COMPLETE_VERSA,
  payload: {resSelected},
});

const showAutoComplete = (showPrediction) => ({
  type: SHOW_AUTO_COMPLETE,
  payload: {showPrediction},
});

export const setAutoCompleteAction = (latitude, longitude, input) => {
  return async (dispatch) => {
    dispatch(selectAutoComplete(input));
    dispatch(showAutoComplete(true));
    dispatch(setAutoComplete());
    try {
      const apiReq = await Axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${input}&location=${latitude},${longitude}&radius=2000`,
      );
      console.log('apireqqq', apiReq);
      dispatch(setAutoCompleteSuccess(apiReq.data.predictions));
      dispatch(changeVersaStatusAction(false));
    } catch (error) {
      console.log('error auto', error);
      dispatch(setAutoCompleteFailed(error));
    }
  };
};

export const selectAutoCompleteAction = (input, data) => {
  return async (dispatch) => {
    console.log('inputt', input);
    dispatch(selectAutoComplete(input.description));
    dispatch(showAutoComplete(false));
    dispatch(setConvertPlaceAction(input.place_id));
  };
};

export const selectAutoCompleteVersaAction = (input, data) => {
  return async (dispatch) => {
    console.log('inputt', input);
    dispatch(selectAutoCompleteVersa(input.formatted_address));
    dispatch(showAutoComplete(false));
    // dispatch(
    //   setLocationAction(
    //     input.geometry.location.lat,
    //     input.geometry.location.lng,
    //   ),
    // );
    // dispatch(setConvertPlaceAction(input.place_id));
  };
};

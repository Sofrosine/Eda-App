import {
  GET_LOCATION,
  GET_LOCATION_FAILED,
  GET_LOCATION_SUCCESS,
} from './constants';

const initialState = {
  loading: false,
  latitude: 0,
  longitude: 0,
  error: false,
};

const getLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        loading: true,
      };
    case GET_LOCATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };

    default:
      return state;
  }
};

export default getLocationReducer;

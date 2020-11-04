import {
  SET_LOCATION_MOVE,
  SET_LOCATION_MOVE_SUCCESS,
  SET_LOCATION_MOVE_FAILED,
} from './constants';

const initialState = {
  loading: false,
  newLatitude: 0,
  newLongitude: 0,
  data: [],
  error: false,
};

const setLocationMoveReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION_MOVE:
      return {
        ...state,
        loading: true,
      };
    case SET_LOCATION_MOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
        newLatitude: action.payload.latitude,
        newLongitude: action.payload.longitude,
      };
    case SET_LOCATION_MOVE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default setLocationMoveReducer;

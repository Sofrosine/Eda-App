import {
  SET_CONVERT_PLACE,
  SET_CONVERT_PLACE_SUCCESS,
  SET_CONVERT_PLACE_FAILED,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const convertPlaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONVERT_PLACE:
      return {
        ...state,
        loading: true,
      };
    case SET_CONVERT_PLACE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case SET_CONVERT_PLACE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default convertPlaceReducer;

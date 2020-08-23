import {
  GET_CITY,
  GET_CITY_SUCCESS,
  GET_CITY_FAILED,
  SET_CITY,
  RESET_CITY,
  GET_ONLY_CITY,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
  selectedCity: [],
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITY:
      return {
        ...state,
        loading: true,
      };
    case GET_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
        selectedCity: action.payload.selectedCity,
      };
    case GET_CITY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_CITY:
      return {
        ...state,
        selectedCity: action.payload.newSelectedCity,
      };
    case RESET_CITY:
      return {
        ...state,
        data: [],
      };
    case GET_ONLY_CITY:
      return {
        ...state,
        data: action.payload.onlyRes,
        selectedCity: action.payload.selectedOnlyCity,
      };

    default:
      return state;
  }
};

export default cityReducer;

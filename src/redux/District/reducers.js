import {
  GET_DISTRICT,
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_FAILED,
  SET_DISTRICT,
  RESET_DISTRICT,
  GET_ONLY_DISTRICT,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
  selectedDistrict: 'placeholder',
};

const districtReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISTRICT:
      return {
        ...state,
        loading: true,
      };
    case GET_DISTRICT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
        selectedDistrict: action.payload.selectedDistrict,
      };
    case GET_DISTRICT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_DISTRICT:
      return {
        ...state,
        selectedDistrict: action.payload.newSelectedDistrict,
      };
    case RESET_DISTRICT:
      return {
        ...state,
        data: [],
        selectedDistrict: 'placeholder',
      };
    case GET_ONLY_DISTRICT:
      return {
        ...state,
        data: action.payload.onlyRes,
        selectedDistrict: action.payload.selectedOnlyDistrict,
      };

    default:
      return state;
  }
};

export default districtReducer;

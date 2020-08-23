import {
  GET_PROVINCE,
  GET_PROVINCE_SUCCESS,
  GET_PROVINCE_FAILED,
  SET_PROVINCE,
  GET_ONLY_PROVINCE,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
  selectedProvince: [],
};

const provinceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROVINCE:
      return {
        ...state,
        loading: true,
      };
    case GET_PROVINCE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
        selectedProvince: action.payload.selectedProvince,
      }; 
    case GET_PROVINCE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_PROVINCE:
      return {
        ...state,
        selectedProvince: action.payload.newSelectedProvince,
      };
    case GET_ONLY_PROVINCE:
      return {
        ...state,
        data: action.payload.onlyRes,
        selectedProvince: action.payload.selectedOnlyProvince,
      };

    default:
      return state;
  }
};

export default provinceReducer;

import {
  SET_LOGIN,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_FAILED,
  SET_LOGIN_ERROR,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case SET_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload.errorStatus,
      };

    default:
      return state;
  }
};

export default loginReducer;

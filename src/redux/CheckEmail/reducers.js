import {
  CHECK_EMAIL,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILED,
  SET_CHECK_EMAIL_ERROR,
} from './constants';

const initialState = {
  loading: false,
  data: {},
  error: false,
};

const checkEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_EMAIL:
      return {
        ...state,
        loading: true,
      };
    case CHECK_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.res,
      };
    case CHECK_EMAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_CHECK_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.errorStatus,
      };

    default:
      return state;
  }
};

export default checkEmailReducer;

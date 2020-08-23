import {
  SET_REQUEST_VERIFICATION,
  SET_REQUEST_VERIFICATION_FAILED,
  SET_REQUEST_VERIFICATION_SUCCESS,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const requestVerificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REQUEST_VERIFICATION:
      return {
        ...state,
        loading: true,
      };
    case SET_REQUEST_VERIFICATION_FAILED:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case SET_REQUEST_VERIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default requestVerificationReducer;

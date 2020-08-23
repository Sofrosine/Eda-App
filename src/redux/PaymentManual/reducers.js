import {
  SET_PAYMENT_MANUAL,
  SET_PAYMENT_MANUAL_FAILED,
  SET_PAYMENT_MANUAL_SUCCESS,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const paymentManualReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_MANUAL:
      return {
        ...state,
        loading: true,
      };
    case SET_PAYMENT_MANUAL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_PAYMENT_MANUAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };

    default:
      return state;
  }
};

export default paymentManualReducer;

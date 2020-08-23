import {
  CANCEL_ORDER,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILED,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const cancelOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CANCEL_ORDER:
      return {
        ...state,
        loading: true,
      };
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case CANCEL_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default cancelOrderReducer;

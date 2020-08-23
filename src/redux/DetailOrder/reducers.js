import {
  DETAIL_ORDER,
  DETAIL_ORDER_SUCCESS,
  DETAIL_ORDER_FAILED,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const detailOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_ORDER:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case DETAIL_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default detailOrderReducer;

import {
  GET_CUSTOMER,
  GET_CUSTOMER_FAILED,
  GET_CUSTOMER_SUCCESS,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER:
      return {
        ...state,
        loading: true,
      };
    case GET_CUSTOMER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.err,
      };
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };

    default:
      return state;
  }
};

export default customerReducer;

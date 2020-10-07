import {
  SEARCH_CUSTOMER,
  SEARCH_CUSTOMER_SUCCESS,
  SEARCH_CUSTOMER_FAILED,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const searchCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CUSTOMER:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.res,
      };
    case SEARCH_CUSTOMER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default searchCustomerReducer;

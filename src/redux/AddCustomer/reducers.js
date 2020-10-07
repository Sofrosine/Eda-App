import {
  ADD_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILED,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const addCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        loading: true,
      };
    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case ADD_CUSTOMER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.err,
      };

    default:
      return state;
  }
};

export default addCustomerReducer;

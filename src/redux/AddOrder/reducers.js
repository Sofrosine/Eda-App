import {ADD_ORDER, ADD_ORDER_SUCCESS, ADD_ORDER_FAILED} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const addOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        loading: true,
      };
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case ADD_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default addOrderReducer;

import {EDIT_ORDER, EDIT_ORDER_SUCCESS, EDIT_ORDER_FAILED} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const editOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_ORDER:
      return {
        ...state,
        loading: true,
      };
    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case EDIT_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default editOrderReducer;

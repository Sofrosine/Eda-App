const {
  GET_REQUEST_ORDER,
  GET_REQUEST_ORDER_SUCCESS,
  GET_REQUEST_ORDER_FAILED,
} = require('./constants');

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const requestOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_ORDER:
      return {
        ...state,
        loading: true,
      };
    case GET_REQUEST_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case GET_REQUEST_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.err,
      };

    default:
      return state;
  }
};

export default requestOrderReducer;

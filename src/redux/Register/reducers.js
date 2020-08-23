import {
  SET_REGISTER,
  SET_REGISTER_FAILED,
  SET_REGISTER_SUCCESS,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER:
      return {
        ...state,
        loading: true,
      };
    case SET_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export default registerReducer;

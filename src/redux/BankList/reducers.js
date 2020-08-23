import {
  GET_BANK_LIST,
  GET_BANK_LIST_SUCCESS,
  GET_BANK_LIST_FAILED,
  SET_BANK_LIST,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
  selectedBank: [],
};

const bankListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANK_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_BANK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
        selectedBank: action.payload.selectedBank,
      };
    case GET_BANK_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_BANK_LIST:
      return {
        ...state,
        selectedBank: action.payload.newSelectedBank,
      };

    default:
      return state;
  }
};

export default bankListReducer;

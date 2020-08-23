import {
  GET_CATEGORY,
  GET_CATEGORY_FAILED,
  GET_CATEGORY_SUCCESS,
  SET_CATEGORY,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
  selectedCategory: '',
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
        selectedCategory: action.payload.selectedCategory,
      };
    case GET_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload.newSelectedCategory,
      };

    default:
      return state;
  }
};

export default categoryReducer;

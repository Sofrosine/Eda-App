import {
  SET_AUTO_COMPLETE,
  SET_AUTO_COMPLETE_SUCCESS,
  SET_AUTO_COMPLETE_FAILED,
  SELECT_AUTO_COMPLETE,
  SHOW_AUTO_COMPLETE,
} from './constants';

const initialState = {
  loading: false,
  error: false,
  data: [],
  selectedData: '',
  showPrediction: false,
};

const autoCompleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTO_COMPLETE:
      return {
        ...state,
        loading: true,
      };
    case SET_AUTO_COMPLETE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
        showPrediction: true,
      };
    case SET_AUTO_COMPLETE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SELECT_AUTO_COMPLETE:
      return {
        ...state,
        selectedData: action.payload.resSelected,
      };
    case SHOW_AUTO_COMPLETE:
      return {
        ...state,
        showPrediction: action.payload.showPrediction,
      };

    default:
      return state;
  }
};

export default autoCompleteReducer;

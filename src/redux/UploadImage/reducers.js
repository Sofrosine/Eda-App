import {
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAILED,
  UPLOAD_IMAGE_SUCCESS,
  RESET_UPLOAD_IMAGE,
  SET_UPLOAD_IMAGE,
} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const uploadImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case UPLOAD_IMAGE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_UPLOAD_IMAGE:
      return {
        ...state,
        loading: false,
        data: [],
      };
    case SET_UPLOAD_IMAGE:
      return {
        ...state,
        loading: false,
        data: {url: action.payload.url, id: action.payload.id},
      };

    default:
      return state;
  }
};

export default uploadImageReducer;

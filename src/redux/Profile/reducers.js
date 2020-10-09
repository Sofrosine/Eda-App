import {
  GET_PROFILE,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
} from './constants'; 

const initialState = {
  loading: true,
  loadingPassword: false,
  loadingProfile: false,
  data: [],
  error: false,
  errorPassword: false,
  errorProfile: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
        error: false,
      };
    case GET_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        loadingPassword: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingPassword: false,
        errorPassword: false,
      };
    case UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        loadingPassword: false,
        errorPassword: action.payload.error,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        loadingProfile: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loadingProfile: false,
        errorProfile: false,
      };
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        loadingProfile: false,
        errorProfile: action.payload.error,
      };

    default:
      return state;
  }
};

export default profileReducer;

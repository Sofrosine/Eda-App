import {
  GET_ACTIVE_ORDER,
  GET_ACTIVE_ORDER_FAILED,
  GET_ACTIVE_ORDER_SUCCESS,
  GET_INACTIVE_ORDER,
  GET_INACTIVE_ORDER_SUCCESS,
  GET_INACTIVE_ORDER_FAILED,
  SET_PAGE_ORDER,
  RESET_PAGE_ORDER,
  STOP_PAGINATION_ACTIVE_ORDER,
  STOP_PAGINATION_INACTIVE_ORDER,
} from './constants';

const initialState = {
  loading: false,
  activeData: [],
  inactiveData: [],
  error: false,
  page: 1,
  isActivePagination: true,
  isInactivePagination: true,
};

const getOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVE_ORDER:
      return {
        ...state,
        loading: true,
      };
    case GET_ACTIVE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        activeData: action.payload.resActive,
      };
    case GET_ACTIVE_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case GET_INACTIVE_ORDER:
      return {
        ...state,
        loading: true,
      };
    case GET_INACTIVE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        inactiveData: action.payload.resInActive,
      };
    case GET_INACTIVE_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SET_PAGE_ORDER:
      return {
        ...state,
        loading: false,
        page: state.page + 1,
      };
    case RESET_PAGE_ORDER:
      return {
        ...state,
        loading: false,
        page: 1,
      };
    case STOP_PAGINATION_ACTIVE_ORDER:
      return {
        ...state,
        isActivePagination: action.payload.paginationStatus,
      };
    case STOP_PAGINATION_INACTIVE_ORDER:
      return {
        ...state,
        isInactivePagination: action.payload.paginationStatus,
      };

    default:
      return state;
  }
};

export default getOrderReducer;

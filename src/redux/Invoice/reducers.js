const {
  GET_INVOICE_LIST,
  GET_INVOICE_LIST_SUCCESS,
  GET_INVOICE_LIST_FAILED,
  GET_TOTAL_INVOICE,
  GET_TOTAL_INVOICE_SUCCESS,
  GET_TOTAL_INVOICE_FAILED,
} = require('./constants');

const initialState = {
  loadingAmount: false,
  loadingList: false,
  data: [],
  totalAmount: 0,
  errorAmount: false,
  errorList: false,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVOICE_LIST:
      return {
        ...state,
        loadingList: true,
      };
    case GET_INVOICE_LIST_SUCCESS:
      return {
        ...state,
        loadingList: false,
        data: action.payload.res,
        errorList: false,
      };
    case GET_INVOICE_LIST_FAILED:
      return {
        ...state,
        loadingList: false,
        errorList: action.payload.err,
      };
    case GET_TOTAL_INVOICE:
      return {
        ...state,
        loadingAmount: true,
      };
    case GET_TOTAL_INVOICE_SUCCESS:
      return {
        ...state,
        loadingAmount: false,
        totalAmount: action.payload.res,
        errorAmount: false,
      };
    case GET_TOTAL_INVOICE_FAILED:
      return {
        ...state,
        loadingAmount: false,
        errorAmount: action.payload.err,
      };

    default:
      return state;
  }
};

export default invoiceReducer;

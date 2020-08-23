import {
  GET_AVAILABLE_PAYMENT,
  GET_AVAILABLE_PAYMENT_SUCCESS,
  GET_AVAILABLE_PAYMENT_FAILED,
} from './constants';

const initialState = {
  loading: false,
  transferData: [],
  paymentGatewayData: [],
  error: false,
};

const availablePaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVAILABLE_PAYMENT:
      return {
        ...state,
        loading: true,
      };
    case GET_AVAILABLE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        transferData: action.payload.transferDataRes,
        paymentGatewayData: action.payload.paymentGatewayDataRes,
      };
    case GET_AVAILABLE_PAYMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default availablePaymentReducer;

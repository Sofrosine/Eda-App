import {api} from '../../api';

const {
  GET_INVOICE_LIST,
  GET_INVOICE_LIST_SUCCESS,
  GET_INVOICE_LIST_FAILED,
  GET_TOTAL_INVOICE,
  GET_TOTAL_INVOICE_SUCCESS,
  GET_TOTAL_INVOICE_FAILED,
} = require('./constants');

const getInvoiceList = () => ({
  type: GET_INVOICE_LIST,
});
const getInvoiceListSuccess = (res) => ({
  type: GET_INVOICE_LIST_SUCCESS,
  payload: {res},
});
const getInvoiceListFailed = (err) => ({
  type: GET_INVOICE_LIST_FAILED,
  payload: {err},
});

export const getInvoiceListAction = () => {
  return async (dispatch) => {
    dispatch(getInvoiceList());
    try {
      const apiReq = await api('get', 'invoice');
      console.log('apireq get invoice list', apiReq);
      dispatch(getInvoiceListSuccess(apiReq.data.data));
    } catch (error) {
      console.log('error get invoice list', error);
      dispatch(getInvoiceListFailed(error));
    }
  };
};

const getTotalInvoice = () => ({
  type: GET_TOTAL_INVOICE,
});
const getTotalInvoiceSuccess = (res) => ({
  type: GET_TOTAL_INVOICE_SUCCESS,
  payload: {res},
});
const getTotalInvoiceFailed = (err) => ({
  type: GET_TOTAL_INVOICE_FAILED,
  payload: {err},
});

export const getTotalInvoiceAction = () => {
  return async (dispatch) => {
    dispatch(getTotalInvoice());
    try {
      const apiReq = await api('get', 'invoice/total');
      console.log('apireq get total invoice', apiReq);
      dispatch(getTotalInvoiceSuccess(apiReq.data.data));
    } catch (error) {
      console.log('error get total invoice', error);
      dispatch(getTotalInvoiceFailed(error));
    }
  };
};

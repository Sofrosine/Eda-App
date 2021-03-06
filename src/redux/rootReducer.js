import {combineReducers} from 'redux';
import loginReducer from './Login/reducers';
import categoryReducer from './Category/reducers';
import uploadImageReducer from './UploadImage/reducers';
import autoCompleteReducer from './AutoComplete/reducers';
import convertPlaceReducer from './ConvertPlaceID/reducers';
import getLocationReducer from './GetLocation/reducers';
import provinceReducer from './Province/reducers';
import cityReducer from './City/reducers';
import districtReducer from './District/reducers';
import getOrderReducer from './GetOrder/reducers';
import checkEmailReducer from './CheckEmail/reducers';
import registerReducer from './Register/reducers';
import loadingReducer from './Loading/reducers';
import detailOrderReducer from './DetailOrder/reducers';
import addOrderReducer from './AddOrder/reducers';
import requestVerificationReducer from './RequestVerification/reducers';
import availablePaymentReducer from './AvailablePayment/reducers';
import bankListReducer from './BankList/reducers';
import paymentManualReducer from './PaymentManual/reducers';
import cancelOrderReducer from './CancelOrder/reducers';
import customerReducer from './GetCustomer/reducers';
import addCustomerReducer from './AddCustomer/reducers';
import searchCustomerReducer from './SearchCustomer/reducers';
import profileReducer from './Profile/reducers';
import invoiceReducer from './Invoice/reducers';
import requestOrderReducer from './RequestOrder/reducers';
import showNotificationAlertReducer from './ShowNotificationAlert/reducers';
import setLocationMoveReducer from './SetLocationMove/reducers';
import versaStatusReducer from './VersaStatus/reducers';

const appReducer = combineReducers({
  loginReducer,
  categoryReducer,
  uploadImageReducer,
  autoCompleteReducer,
  convertPlaceReducer,
  getLocationReducer,
  provinceReducer,
  cityReducer,
  districtReducer,
  getOrderReducer,
  checkEmailReducer,
  registerReducer,
  loadingReducer,
  detailOrderReducer,
  addOrderReducer,
  requestVerificationReducer,
  availablePaymentReducer,
  bankListReducer,
  paymentManualReducer,
  cancelOrderReducer,
  customerReducer,
  addCustomerReducer,
  searchCustomerReducer,
  profileReducer,
  invoiceReducer,
  requestOrderReducer,
  showNotificationAlertReducer,
  setLocationMoveReducer,
  versaStatusReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DELETE_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

const {
  SHOW_NOTIFICATION_ALERT,
  CLOSE_NOTIFICATION_ALERT,
} = require('./constants');

const initialState = {
  loading: false,
  showNotificationAlert: false,
  notificationTitle: '',
  notificationBody: '',
  notificationData: {},
  error: false,
};

const showNotificationAlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION_ALERT:
      return {
        ...state,
        showNotificationAlert: action.payload.isShow,
        notificationTitle: action.payload.title,
        notificationBody: action.payload.body,
        notificationData: action.payload.data,
      };
    case CLOSE_NOTIFICATION_ALERT:
      return {
        ...state,
        showNotificationAlert: false,
      };
    default:
      return state;
  }
}; 

export default showNotificationAlertReducer;

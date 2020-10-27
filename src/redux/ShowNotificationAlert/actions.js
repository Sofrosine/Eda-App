const {
  SHOW_NOTIFICATION_ALERT,
  CLOSE_NOTIFICATION_ALERT,
} = require('./constants');

const showNotificationAlert = (isShow, title, body, data) => ({
  type: SHOW_NOTIFICATION_ALERT,
  payload: {isShow, title, body, data},
});

const closeNotificationAlert = () => ({
  type: CLOSE_NOTIFICATION_ALERT,
  payload: {},
});

export const showNotificationAction = (isShow, title, body, data) => {
  return async (dispatch) => {
    dispatch(showNotificationAlert(isShow, title, body, data));
  };
}; 

export const closeNotificationAction = () => {
  return async (dispatch) => {
    dispatch(closeNotificationAlert());
  };
};

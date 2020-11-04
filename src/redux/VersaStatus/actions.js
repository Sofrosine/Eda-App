const {CHANGE_VERSA_STATUS} = require('./constants');

const changeVersaStatus = (res) => ({
  type: CHANGE_VERSA_STATUS,
  payload: {res},
});

export const changeVersaStatusAction = (status) => {
  return async (dispatch) => {
    dispatch(changeVersaStatus(status));
  };
};

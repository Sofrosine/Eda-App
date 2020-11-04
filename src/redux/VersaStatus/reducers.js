const {CHANGE_VERSA_STATUS} = require('./constants');

const initialState = {
  isVersa: false,
};

const versaStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VERSA_STATUS:
      return {
        ...state,
        isVersa: action.payload.res,
      };

    default:
      return state;
  }
};

export default versaStatusReducer;

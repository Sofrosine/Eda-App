import {SET_LOADING} from './constants';

const setLoading = (loadingStatus) => ({
  type: SET_LOADING,
  payload: {loadingStatus},
});

export const setLoadingAction = (loadingStatus) => {
  return async (dispatch) => {
    dispatch(setLoading(loadingStatus));
  };
};

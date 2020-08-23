import {
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILED,
  SET_CATEGORY,
} from './constants';
import {api} from '../../api';

const getCategory = () => ({
  type: GET_CATEGORY,
});

const getCategorySuccess = (res, selectedCategory) => ({
  type: GET_CATEGORY_SUCCESS,
  payload: {res, selectedCategory},
});

const getCategoryFailed = (error) => ({
  type: GET_CATEGORY_FAILED,
  payload: {error},
});

const setCategory = (newSelectedCategory) => ({
  type: SET_CATEGORY,
  payload: {newSelectedCategory},
});

export const getCategoryAction = () => {
  return async (dispatch) => {
    dispatch(getCategory());
    try {
      const apiReq = await api('get', 'category');
      console.log('reqq', apiReq.data.data);
      dispatch(getCategorySuccess(apiReq.data.data, apiReq.data.data[0].id));
    } catch (error) {
      console.log('error', error);
      dispatch(getCategoryFailed(error.message));
    }
  };
};

export const setCategoryAction = (val) => {
  return async (dispatch) => {
    dispatch(setCategory(val));
  };
};

import Axios from 'axios';
import {getData} from '../../utils';

const baseURL = 'http://178.128.212.200/api/merchant';
const getUser = async () => {
  const token = await getData('@user_token');
  const location = await getData('@user_location');
  const phone = await getData('@user_phone');
  return {
    token,
    location,
    phone,
  };
};

const api = async (method, endpoint, params = {}, isForm) => {
  const dataUser = await getUser();
  const startAxios = await Axios({
    method,
    url: `${baseURL}/${endpoint}`,
    headers: {
      Authorization: `Bearer ${dataUser.token}`,
      'Content-Type': isForm && 'multipart/form-data',
    },
    params: {
      // Default Parameter
      ...params,
    },
    data: params,
  });
  return startAxios;
};

export default api;

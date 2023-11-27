import { PATH } from '~/routes';
import api from './axiosInstance';

const authApi = {
  login: body => {
    console.log('body', body);
    const url = `/auth${PATH.LOGIN}`;
    return api.post(url, body);
  },
  signup: body => {
    console.log('body', body);
    const url = `auth${PATH.SIGNUP}`;
    return api.post(url, body);
  }
};

export default authApi;

import { PATH } from '~/routes';
import api from './axiosInstance';

const authApi = {
  login: body => {
    const url = `${PATH.LOGIN}`;
    return api.post(url, body);
  },
  signup: body => {
    const url = `${PATH.SIGNUP}`;
    return api.post(url, body);
  },
  getCode: body => {
    const url = 'auth/verify-mail';
    const mail = { receiverMail: body };
    return api.post(url, mail);
  },
  fetchCurrentUser: () => {
    const url = '/auth/current-user';
    return api.get(url);
  },
  verifyGoogleCount: body => {
    const url = 'auth/verify-google-account';
    return api.post(url, body);
  }
};

export default authApi;

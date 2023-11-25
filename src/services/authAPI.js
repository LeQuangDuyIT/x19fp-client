import { PATH } from '~/routes';
import api from './axiosInstance';

const authApi = {
  login: body => {
    const url = `/auth/${PATH.LOGIN}`;

    return api.post(url, body);
  }
};

export default authApi;

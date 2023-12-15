import api from './axiosInstance.js';

const accountAPI = {
  getAllUser: () => {
    const url = '/admin/get-all-user';
    return api.get(url);
  },
  deleteUser: body => {
    console.log('body', body);
    const url = `/admin/delete-user/${body}`;
    console.log(url);
    return api.delete(url);
  }
};

export default accountAPI;

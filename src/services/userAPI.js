import api from './axiosInstance.js';

const accountAPI = {
  getAllUser: () => {
    const url = '/admin/get-all-user';
    return api.get(url);
  },
  deleteUser: body => {
    const url = '/admin/delete-user';
    return api.delete(url, body);
  }
};

export default accountAPI;

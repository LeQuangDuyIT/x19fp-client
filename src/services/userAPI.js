import api from './axiosInstance.js';

const accountAPI = {
  getAllUser: body => {
    const url = `/admin/get-all-user?limit=${body.limit}&page=${body.page}`;
    return api.get(url);
  },
  deleteUser: body => {
    const url = `/admin/delete-user/${body}`;
    return api.delete(url);
  }
};

export default accountAPI;

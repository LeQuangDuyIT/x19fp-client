import api from './axiosInstance';

const studyGroupAPI = {
  getGroupById: () => {
    const url = '/group/get-groups';
    return api.get(url);
  },
  createGroup: body => {
    const url = '/group/create-study-group';
    return api.post(url, body);
  }
};

export default studyGroupAPI;

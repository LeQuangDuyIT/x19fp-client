import api from './axiosInstance';

const RecordAPI = {
  create: body => {
    const url = '/records';
    return api.post(url, body);
  }
};

export default RecordAPI;

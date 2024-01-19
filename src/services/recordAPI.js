import api from './axiosInstance';

const RecordAPI = {
  create: body => {
    const url = '/records';
    return api.post(url, body);
  },
  updateById: (id, body) => {
    const url = `/records/${id}`;
    return api.put(url, body);
  },
  getByTestId: id => {
    const url = `/records/test/${id}`;
    return api.get(url);
  }
};

export default RecordAPI;

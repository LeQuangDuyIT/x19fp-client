import api from './axiosInstance';

const TestAPI = {
  create: () => {
    const url = '/tests';
    return api.post(url);
  },
  getTestById: id => {
    const url = `/tests/${id}`;
    return api.get(url);
  },
  updateTestById: (id, body) => {
    const url = `/tests/${id}`;
    return api.put(url, body);
  }
};

export default TestAPI;

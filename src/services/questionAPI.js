import api from './axiosInstance';

const QuestionAPI = {
  createMultipleChoice: body => {
    const url = '/questions/choice';
    return api.post(url, body);
  },
  initalQuestion: () => {
    const url = '/questions/inital';
    return api.post(url);
  },
  getById: id => {
    const url = `/questions/${id}`;
    return api.get(url);
  },
  getMyQuestions: () => {
    const url = '/questions/mine';
    return api.get(url);
  }
};

export default QuestionAPI;

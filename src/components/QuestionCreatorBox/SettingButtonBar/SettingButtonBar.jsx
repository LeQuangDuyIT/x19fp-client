import { PlusCircleOutlined, CopyOutlined } from '@ant-design/icons';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import QuestionAPI from '~/services/questionAPI';
import TestAPI from '~/services/testAPI';
import { setQuestions } from '~/redux/test/testSlice';
import { Tooltip } from 'antd';

const SettingButtonBar = ({ question }) => {
  const { test, questions } = useSelector(state => state.test);
  const dispatch = useDispatch();

  const handleInsertQuestion = async () => {
    const res = await QuestionAPI.initalQuestion();
    const currentIndex = questions.findIndex(item => item._id === question._id);
    const questionIdArray = questions.map(question => question._id);

    const createdQuestion = res.data.data;
    questionIdArray.splice(currentIndex, 0, createdQuestion._id);

    const updatedTest = { ...test, questions: questionIdArray };
    const putRes = await TestAPI.updateTestById(test._id, updatedTest);
    if (putRes?.data?.isSuccess) {
      const newQuestionArray = [...questions, createdQuestion];
      dispatch(setQuestions(newQuestionArray));
    }
  };

  const handleDeleteQuestion = async () => {
    if (questions.length === 1) return;
    const deleteId = question._id;
    const newQuestions = questions.filter(question => question._id !== deleteId);
    const questionIdArray = newQuestions.map(question => question._id);
    const newTest = { ...test, questions: questionIdArray };
    const putRes = await TestAPI.updateTestById(test._id, newTest);

    if (putRes?.data?.isSuccess) {
      dispatch(setQuestions(newQuestions));
    }
  };

  return (
    <div className='absolute right-0 bottom-0 translate-x-[calc(100%+16px)] z-10'>
      <div className=' flex flex-col gap-6 p-4 bg-white shadow-2xl rounded-md'>
        <Tooltip title='Thêm câu hỏi/bài tập' placement='right'>
          <PlusCircleOutlined
            className='text-2xl text-gray-400 cursor-pointer hover:text-black'
            onClick={handleInsertQuestion}
          />
        </Tooltip>
        <Tooltip title='Nhân bản' placement='right'>
          <CopyOutlined className='text-2xl text-gray-400 cursor-pointer hover:text-black' />
        </Tooltip>
        <Tooltip title='Xóa' placement='right'>
          <FaRegTrashAlt
            className='text-2xl text-gray-400 cursor-pointer hover:text-black'
            onClick={handleDeleteQuestion}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default SettingButtonBar;

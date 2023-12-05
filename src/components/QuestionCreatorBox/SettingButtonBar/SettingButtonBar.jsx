import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import QuestionAPI from '~/services/questionAPI';
import TestAPI from '~/services/testAPI';
import { setQuestions } from '~/redux/test/testSlice';

const SettingButtonBar = ({ question }) => {
  const { test, questions } = useSelector(state => state.test);
  const dispatch = useDispatch();

  const handleInsertQuestion = async () => {
    const res = await QuestionAPI.initalQuestion();
    const currentIndex = questions.findIndex(item => item._id === question._id);
    const questionIdArray = questions.map(question => question._id);

    const createdQuestion = res.data.data;
    console.log(createdQuestion);
    questionIdArray.splice(currentIndex, 0, createdQuestion._id);

    const updatedTest = { ...test, questions: questionIdArray };
    const putRes = await TestAPI.updateTestById(test._id, updatedTest);
    if (putRes?.data?.isSuccess) {
      const newQuestionArray = [...questions, createdQuestion];
      console.log(newQuestionArray);
      dispatch(setQuestions(newQuestionArray));
    }
  };

  return (
    <div className='absolute right-0 bottom-0 translate-x-[calc(100%+16px)] z-10'>
      <div className=' flex flex-col gap-4 p-4 bg-white shadow-2xl rounded-md'>
        <PlusCircleOutlined
          className='text-2xl text-gray-400 cursor-pointer hover:text-black'
          onClick={handleInsertQuestion}
        />
      </div>
    </div>
  );
};

export default SettingButtonBar;

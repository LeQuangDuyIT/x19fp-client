import { useState, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import parser from 'html-react-parser';
import { Button, Col, Row, message } from 'antd';
import { CheckSquareOutlined, CaretDownOutlined } from '@ant-design/icons';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import MultipleChoiceCreator from '~/components/MultipleChoiceCreator';

export const CreateQuestionContext = createContext();

const initialAnswers = Array.from({ length: 4 }, () => ({
  id: uuidv4(),
  content: '',
  isCorrect: false
}));

const QuestionCreatorBox = () => {
  const [topic, setTopic] = useState('');
  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState([]);
  const [isCorrectRequired, setIsCorrectRequired] = useState(false);

  const onAnswerInputChange = (idChange, value) => {
    const newAnswers = answers.map(answer =>
      answer.id === idChange ? { ...answer, content: value } : answer
    );
    setAnswers(newAnswers);
  };

  const handleCreateMultipleChoice = () => {
    const isValid = handleValidate();
    if (!isValid) return;
    // eslint-disable-next-line no-console
    console.log(topic);
    // eslint-disable-next-line no-console
    console.log(answers);
  };

  const handleValidate = () => {
    const errorFields = answers
      .filter(answer => !answer.content || parser(answer.content) === '')
      .map(answer => answer.id);
    if (!topic || parser(topic) === '') errorFields.push('topic');

    const correctAnswer = answers.find(answer => answer.isCorrect);
    if (!correctAnswer) {
      message.error('Chưa chọn đáp án đúng');
      setIsCorrectRequired(true);
    }
    if (errorFields.length > 0) setErrors(errorFields);
    return errorFields.length === 0 && correctAnswer;
  };

  const handleRefreshField = fieldName => {
    const errorFields = errors.filter(field => field !== fieldName);
    setErrors(errorFields);
    setIsCorrectRequired(false);
  };

  const handleDeleteAnswer = answerId => {
    const newFields = answers.filter(answer => answer.id !== answerId);
    setAnswers(newFields);
  };

  const handleSetCorrect = answerId => {
    const newFields = answers.map(answer =>
      answer.id === answerId ? { ...answer, isCorrect: true } : { ...answer, isCorrect: false }
    );
    setAnswers(newFields);
    setIsCorrectRequired(false);
  };

  return (
    <CreateQuestionContext.Provider
      value={{
        topic,
        answers,
        errors,
        isCorrectRequired,
        onAnswerInputChange,
        onTopicInputChange: value => setTopic(value),
        handleCreateMultipleChoice,
        handleRefreshField,
        handleDeleteAnswer,
        handleSetCorrect
      }}
    >
      <BlockSectionWrapper className='h-auto'>
        <Row gutter={16}>
          <Col span={18} className='flex flex-col gap-8'>
            <MultipleChoiceCreator handleSubmit={handleCreateMultipleChoice} />
          </Col>
          <Col span={6} className='flex flex-col gap-2'>
            <Button className='w-full h-[56px] p-4 flex gap-4 justify-between items-center border border-[#ccc] rounded-md text-base cursor-pointer'>
              <div className='flex items-center gap-3'>
                <CheckSquareOutlined />
                <span>Trắc nghiệm 1 đáp án</span>
              </div>
              <CaretDownOutlined />
            </Button>
            <Button type='primary' className='w-full h-[56px]' onClick={handleCreateMultipleChoice}>
              Lưu
            </Button>
          </Col>
        </Row>
      </BlockSectionWrapper>
    </CreateQuestionContext.Provider>
  );
};

export default QuestionCreatorBox;

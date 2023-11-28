import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import MultipleChoiceAnswerField from '~/components/MultipleChoiceAnswerField';
import ContentField from '../ContentField';

const initialAnswers = Array.from({ length: 4 }, () => ({
  id: uuidv4(),
  content: '',
  isTrue: false
}));

const MultipleChoiceCreator = ({ form, handleSubmit }) => {
  const [topic, setTopic] = useState('');
  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState([]);

  const onAnswerInputChange = (indexChange, value) => {
    const newAnswers = answers.map((answer, index) =>
      index === indexChange ? { ...answer, content: value } : answer
    );
    setAnswers(newAnswers);
  };

  const onSubmitForm = formValue => {
    const emptyFields = [];
    for (const fieldName in formValue) {
      if (!formValue[fieldName] || formValue[fieldName] === '') emptyFields.push(fieldName);
    }
    if (emptyFields.length > 0) {
      setErrors(emptyFields);
    } else {
      handleSubmit(formValue);
    }
  };

  const handleRefreshField = fieldName => {
    const errorFields = errors.filter(field => field !== fieldName);
    setErrors(errorFields);
  };

  const handleDeleteAnswer = answerId => {
    const newFields = answers.filter(answer => answer.id !== answerId);
    setAnswers(newFields);
  };

  return (
    <div>
      <div>
        <Form form={form} layout='vertical' onFinish={onSubmitForm}>
          <ContentField
            name='topic'
            value={topic}
            textarea
            onChange={e => setTopic(e.target.value)}
            placeholder='Câu hỏi/đề bài'
            isError={errors.includes('topic')}
            refreshField={() => handleRefreshField('topic')}
          />
          <div className='flex flex-col gap-1 mt-4'>
            {answers.map((answer, index) => (
              <MultipleChoiceAnswerField
                key={answer.id}
                index={index}
                name={`answer-${answer.id}`}
                value={answer.content}
                onInputChange={onAnswerInputChange}
                isError={errors.includes(`answer-${answer.id}`)}
                refreshField={() => handleRefreshField(`answer-${answer.id}`)}
                deleteAnswer={() => handleDeleteAnswer(answer.id)}
              />
            ))}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MultipleChoiceCreator;

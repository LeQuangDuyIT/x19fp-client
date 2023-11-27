import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import MultipleChoiceAnswerField from '~/components/MultipleChoiceAnswerField';
import ExerciseTopicField from '../ExerciseTopicField';

const initialAnswers = Array.from({ length: 4 }, (_, index) => ({
  id: uuidv4(),
  name: `answer${index}`,
  content: '',
  isTrue: false
}));

const MultipleChoiceCreator = () => {
  const [answers, setAnswers] = useState(initialAnswers);

  const onAnswerInputChange = (indexChange, value) => {
    const newAnswers = answers.map((answer, index) =>
      index === indexChange ? { ...answer, content: value } : answer
    );
    setAnswers(newAnswers);
  };

  return (
    <div>
      <div>
        <Form layout='vertical'>
          <ExerciseTopicField name={'topic'} />
          <div className='flex flex-col gap-1 mt-4'>
            {answers.map((answer, index) => (
              <MultipleChoiceAnswerField
                key={answer.id}
                index={index}
                name={answer.name}
                content={answer.content}
                onInputChange={onAnswerInputChange}
              />
            ))}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MultipleChoiceCreator;

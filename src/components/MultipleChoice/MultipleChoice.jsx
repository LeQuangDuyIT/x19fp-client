import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import MultipleChoiceAnswerField from '~/components/MultipleChoiceAnswerField';

const initialAnswers = Array.from({ length: 4 }, (_, index) => ({
  id: uuidv4(),
  name: index,
  content: '',
  isTrue: false
}));

const MultipleChoice = () => {
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
          <Form.Item name='intro' rules={[{ required: true, message: 'Please input Intro' }]}>
            <TextArea
              autoSize={{ minRows: 5 }}
              placeholder='Câu hỏi/đề bài...'
              className='bg-[#ccc]/20'
            />
          </Form.Item>
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

export default MultipleChoice;

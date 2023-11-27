import { useState } from 'react';
import clsx from 'clsx';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const ExerciseTopicField = ({ name, rules }) => {
  const [isFocusing, setIsFocusing] = useState(false);
  return (
    <Form.Item name={name} rules={rules}>
      <div
        className={clsx(
          'relative w-full border-b-[3px] before:absolute before:h-[3px] before:bottom-[-3px] before:left-1/2 before:-translate-x-1/2 before:bg-[#2563EB] before:opacity-0',
          {
            'border-b-[#ccc]/60 before:w-0': !isFocusing,
            'before:w-full before:opacity-100 before:duration-700': isFocusing
          }
        )}
      >
        <TextArea
          autoSize={{ minRows: 5 }}
          placeholder='Câu hỏi/đề bài...'
          className={clsx('rounded-b-none border-none border-b border-b-black', {
            'bg-[#ccc]/20': !isFocusing,
            'bg-[#2564eb15]/[0.04]': isFocusing
          })}
          onFocus={() => setIsFocusing(true)}
          onBlur={() => setIsFocusing(false)}
        />
      </div>
    </Form.Item>
  );
};

export default ExerciseTopicField;

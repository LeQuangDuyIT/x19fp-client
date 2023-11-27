import { useState } from 'react';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CloseOutlined } from '@ant-design/icons';
import { FaRegCircle } from 'react-icons/fa';
import { alphabet } from '~/utils/constants';
import clsx from 'clsx';

const MultipleChoiceAnswerField = ({ index, name, content, onInputChange }) => {
  const [isFocusing, setIsFocusing] = useState(false);
  return (
    <Form.Item name={name}>
      <div className='flex items-start gap-1'>
        <div className='flex items-center gap-4'>
          <FaRegCircle className='cursor-pointer text-xl text-[#ccc]/50' />
          <h4 className='w-7 text-xl'>{alphabet[index]}.</h4>
        </div>
        <div
          className={clsx(
            'relative w-full border-b-[2px] before:absolute before:h-[2px] before:bottom-[-3px] before:left-1/2 before:-translate-x-1/2 before:bg-[#2563EB]',
            {
              'border-b-[#ccc]/60 before:w-0': !isFocusing,
              'before:w-full before:duration-700': isFocusing
            }
          )}
        >
          <TextArea
            autoSize={{ minRows: 1 }}
            value={content}
            className={clsx('rounded-b-none border-none border-b border-b-black', {
              'bg-[#2564eb15]/[0.04]': isFocusing
            })}
            onChange={e => onInputChange(index, e.target.value)}
            onFocus={() => setIsFocusing(true)}
            onBlur={() => setIsFocusing(false)}
          />
        </div>
        <div className='pl-1 pt-1'>
          <CloseOutlined className='cursor-pointer opacity-60 hover:opacity-100' />
        </div>
      </div>
    </Form.Item>
  );
};

export default MultipleChoiceAnswerField;

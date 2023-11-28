import { useState } from 'react';
import clsx from 'clsx';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ContentField = ({
  value,
  name,
  onChange,
  minRows = 1,
  placeholder,
  transparent,
  isError,
  refreshField
}) => {
  const [isFocusing, setIsFocusing] = useState(false);
  const bottomBorderHeightClasses =
    minRows > 1
      ? 'border-b-[3px] before:h-[3px] before:bottom-[-3px]'
      : 'border-b-[2px] before:h-[2px] before:bottom-[-2px]';

  const onInputField = () => {
    if (!isError) return;
    refreshField();
  };

  return (
    <Form.Item name={name} validateStatus={isError ? 'error' : undefined} className='w-full'>
      <div
        className={clsx(
          'relative w-full before:absolute before:left-1/2 before:-translate-x-1/2 before:bg-[#2563EB] before:opacity-0',
          bottomBorderHeightClasses,
          {
            'border-b-[#ccc]/60 before:w-0': !isFocusing,
            'before:w-full before:opacity-100 before:duration-700': isFocusing,
            'before:bg-[#2563EB]': isFocusing && !isError,
            'before:w-full before:opacity-100 before:bg-red-400': isError
          }
        )}
      >
        <TextArea
          autoSize={{ minRows }}
          placeholder={placeholder}
          value={value}
          className={clsx('rounded-b-none border-none border-b border-b-black', {
            'bg-[#ccc]/20': !isFocusing && !transparent,
            'bg-[#2564eb15]/[0.04]': isFocusing && !isError,
            'bg-red-50': isError
          })}
          onChange={onChange}
          onFocus={() => setIsFocusing(true)}
          onBlur={() => setIsFocusing(false)}
          onInput={onInputField}
        />
      </div>
      {isError && (
        <div className='mt-1 flex items-center gap-1 text-red-400'>
          <ExclamationCircleOutlined />
          <p>Trường dữ liệu không hợp lệ</p>
        </div>
      )}
    </Form.Item>
  );
};

export default ContentField;

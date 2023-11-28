import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import QuillEditor from '../QuillEditor';
import ClickOutsideObserver from '../ClickOutsideObserver';

const ContentField = ({
  value,
  name,
  onChange,
  textarea,
  placeholder,
  transparent,
  isError,
  refreshField,
  labelClicked
}) => {
  const [isFocusing, setIsFocusing] = useState(false);
  const [isExtendingToolbar, setIsExtendingToolbar] = useState(false);

  useEffect(() => {
    if (!isFocusing || isError) return;
    setIsExtendingToolbar(true);
  }, [isFocusing, isError]);

  const onInputField = () => {
    if (!isError) return;
    refreshField();
  };

  const customClasses = textarea
    ? 'border-b-[3px] before:h-[3px] before:bottom-[-3px]'
    : 'border-b-[2px] before:h-[2px] before:bottom-[-2px]';

  return (
    <>
      <ClickOutsideObserver onClickOutside={() => setIsExtendingToolbar(false)}>
        <div
          className={clsx('flex flex-col w-full mb-4', {
            'mb-[72px]': isExtendingToolbar
          })}
        >
          <div
            className={clsx(
              'relative w-full outline-none rounded-t-md before:absolute before:left-1/2 before:-translate-x-1/2 before:bg-[#2563EB] before:opacity-0',
              customClasses,
              {
                'bg-[#ccc]/20': !isFocusing && !transparent,
                'border-b-[#ccc]/60 before:w-0': !isFocusing,
                'before:w-[calc(100%+2px)] before:opacity-100 before:duration-700': isFocusing,
                'bg-blue-50/50 shadow-input-blue before:bg-[#2563EB]': isFocusing && !isError,
                'bg-red-50 shadow-input-red before:w-[calc(100%+2px)] before:opacity-100 before:bg-red-400':
                  isError
              }
            )}
          >
            <Form.Item name={name} validateStatus={isError ? 'error' : undefined} className='mb-0'>
              <QuillEditor
                value={value}
                placeholder={placeholder}
                isExtendingToolbar={isExtendingToolbar}
                onChange={onChange}
                onFocus={() => setIsFocusing(true)}
                onBlur={() => setIsFocusing(false)}
                onKeyDown={onInputField}
                textarea={textarea}
                labelClicked={labelClicked}
              />
            </Form.Item>
          </div>
          {isError && (
            <div className='mt-1 flex items-center gap-1 text-red-400'>
              <ExclamationCircleOutlined />
              <p>Trường dữ liệu không hợp lệ</p>
            </div>
          )}
        </div>
        {/* {isOpenEditor && (
        <div className='fixed bottom-4 left-1/2 -translate-x-1/2 bg-white z-10'>
          <UnmountOnClickOutside onClickOutside={() => setIsOpenEditor(false)}>
            <MathEditor />
          </UnmountOnClickOutside>
        </div>
      )} */}
      </ClickOutsideObserver>
    </>
  );
};

export default ContentField;

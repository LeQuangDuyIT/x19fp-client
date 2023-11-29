import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FaRegImage } from 'react-icons/fa6';
import QuillEditor from '../QuillEditor';
import ClickOutsideObserver from '../ClickOutsideObserver';

const UploadImageButton = () => (
  <Button
    icon={<FaRegImage className='text-xl' />}
    className={clsx(
      'absolute left-[calc(656px+6px)] bottom-0 translate-y-[calc(100%+8px)]',
      'flex items-center text-gray-500 h-[43.38px]',
      'bg-transparent border border-[#ccc] rounded-none cursor-pointer'
    )}
  >
    UPLOAD
  </Button>
);

const ContentField = ({
  value,
  onChange,
  textarea,
  placeholder,
  transparent,
  isError,
  refreshField,
  labelClicked,
  allowUploadImage
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
            'mb-[88px] duration-500': isExtendingToolbar
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
            {isExtendingToolbar && allowUploadImage && <UploadImageButton />}
          </div>
          {isError && (
            <div className='mt-1 flex items-center gap-1 text-red-400'>
              <ExclamationCircleOutlined />
              <p>Trường dữ liệu không hợp lệ</p>
            </div>
          )}
        </div>
      </ClickOutsideObserver>
    </>
  );
};

export default ContentField;

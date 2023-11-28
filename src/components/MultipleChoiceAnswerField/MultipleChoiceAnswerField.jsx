import { CloseOutlined } from '@ant-design/icons';
import { FaRegCircle } from 'react-icons/fa';
import { alphabet } from '~/utils/constants';
import ContentField from '../ContentField';
import { Popconfirm } from 'antd';

const MultipleChoiceAnswerField = ({
  index,
  name,
  value,
  isError,
  onInputChange,
  refreshField,
  deleteAnswer
}) => {
  return (
    <div className='flex items-start gap-1'>
      <div className='flex items-center gap-4'>
        <FaRegCircle className='cursor-pointer text-xl text-[#ccc]/50' />
        <h4 className='w-7 text-xl'>{alphabet[index]}.</h4>
      </div>
      <ContentField
        name={name}
        value={value}
        onChange={e => onInputChange(index, e.target.value)}
        isError={isError}
        transparent
        refreshField={refreshField}
      />
      <div className='pl-1 pt-1'>
        <Popconfirm
          title='Xóa đáp án'
          description='Bạn chắc chắn muốn xóa đáp án này?'
          okText='Xóa'
          cancelText='Đóng'
          okButtonProps={{ danger: true }}
          onConfirm={deleteAnswer}
        >
          <CloseOutlined className='cursor-pointer opacity-60 hover:opacity-100' />
        </Popconfirm>
      </div>
    </div>
  );
};

export default MultipleChoiceAnswerField;

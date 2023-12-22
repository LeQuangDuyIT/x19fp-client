import { Button } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
const StudyGroupCreator = () => {
  return (
    <div className='text-red-500 border-2 border-gray-400 w-full '>
      <Button type='text' icon={<PlusOutlined />} block size='middle'>
        Thêm nhóm mới
      </Button>
    </div>
  );
};

export default StudyGroupCreator;

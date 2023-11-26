import { Button } from 'antd';
import { QuestionCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { GrGamepad } from 'react-icons/gr';

const Create = () => {
  const buttonClasses = 'text-left text-white/60 font-bold hover:text-white';
  return (
    <div className='flex flex-col gap-y-2'>
      <Button icon={<QuestionCircleOutlined />} type='text' className={buttonClasses}>
        Câu hỏi
      </Button>
      <Button icon={<FileTextOutlined />} type='text' className={buttonClasses}>
        Đề thi, kiểm tra
      </Button>
      <Button icon={<GrGamepad />} type='text' className={buttonClasses}>
        Game trắc nghiệm
      </Button>
    </div>
  );
};

export default Create;

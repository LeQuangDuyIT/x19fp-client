import { Avatar } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Container from '~/components/Container';
import { DownOutlined } from '@ant-design/icons';

const BackHomeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className='flex items-center gap-2 bg-transparent text-white cursor-pointer'
      onClick={() => navigate('/')}
    >
      <span className='flex justify-center items-center w-9 aspect-square rounded-full border border-white'>
        <BsArrowLeft />
      </span>
      <span>Trang chủ</span>
    </button>
  );
};

const SimpleHeader = () => {
  return (
    <div className='bg-[#2563EB]'>
      <Container>
        <div className='h-[113px] flex justify-between items-center'>
          <BackHomeButton />
          <h2 className='text-white font-bold'>TEST BANK</h2>
          <div className='flex items-center gap-3 text-white cursor-pointer'>
            <Avatar
              style={{ backgroundColor: 'orange', verticalAlign: 'middle', fontWeight: 'bold' }}
              size='large'
            >
              D
            </Avatar>
            <h4>Lê Quang Duy</h4>
            <DownOutlined className='text-[10px]' />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SimpleHeader;

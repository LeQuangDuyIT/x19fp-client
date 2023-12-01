import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '~/redux/user/userSlice';

const User = () => {
  const dispatch = useDispatch();
  return (
    <div className='flex flex-wrap gap-y-4 items-start'>
      <Button
        type='text'
        icon={<LogoutOutlined />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
        onClick={() => dispatch(logout())}
      >
        Đăng xuất
      </Button>
    </div>
  );
};

export default User;

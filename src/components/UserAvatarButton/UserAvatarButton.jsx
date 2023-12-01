import { Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import clsx from 'clsx';

const UserAvatarButton = ({ user, large }) => {
  return (
    <div className='flex items-center gap-3 text-white cursor-pointer'>
      <Avatar
        style={{ backgroundColor: 'orange', verticalAlign: 'middle', fontWeight: 'bold' }}
        size={large ? 'large' : undefined}
      >
        {user?.firstName[0]}
      </Avatar>
      <h4 className={clsx({ 'text-sm': !large, 'text-base': large })}>
        {user.firstName} {user.lastName}
      </h4>
      <DownOutlined className='text-[10px]' />
    </div>
  );
};

export default UserAvatarButton;

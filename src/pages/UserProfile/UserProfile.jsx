import SimpleHeader from '~/layouts/SimpleHeader';
import UserAvatar from './UserAvatar';
import UserDetail from './UserDetail';
const UserProfile = () => {
  return (
    <div className='bg-[#f8fafb] min-h-screen'>
      <SimpleHeader />
      <div className='text-center py-3 font-semibold text-xl '> Thông tin cá nhân </div>
      <div className='flex relative  max-h-screen '>
        <div className='mx-auto mt-8 w-[1200px] gap-10 flex'>
          <UserAvatar />
          <UserDetail />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

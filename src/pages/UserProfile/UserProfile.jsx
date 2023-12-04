import SimpleHeader from '~/layouts/SimpleHeader';
import UserAvatar from './UserAvatar';
import UserDetail from './UserDetail';

const UserProfile = () => {
  return (
    <>
      <SimpleHeader />
      <div className='flex relative bg-[#f8fafb]  min-h-screen '>
        <div className='mx-auto mt-8 w-[1200px] gap-10 flex'>
          <UserAvatar />
          <UserDetail />
        </div>
      </div>
    </>
  );
};

export default UserProfile;

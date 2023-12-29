import { useState } from 'react';
import { useSelector } from 'react-redux';
import StudyGroupCreator from './StudyGroupCreator/StudyGroupCreator';
import StudyGroupList from './StudyGroupList/StudyGroupList';
import StudyGroupSearchbar from './StudyGroupSearchbar/StudyGroupSearchbar';
import { FaUsers } from 'react-icons/fa6';
import { Button } from 'antd';

const StudyGroupManagement = () => {
  const { data = [] } = useSelector(state => state.group.studyGroup);
  const [user, setUser] = useState([]);
  const getSearchUser = () => {
    const selectedUser = user.map(user => (
      <div
        key={user.id}
        id={user.id}
        className='flex border-b border-blue-500/40  gap-3 p-2 items-center'
      >
        {' '}
        <div className='animate-get-code-success-bg-fade-in '>
          <img
            className=' w-7 h-7 rounded-full  object-cover'
            src={user.picture || '../src/assets/default-avatar/user.png'}
          />
        </div>
        <div className='text-[12px] font-semibold hover:text-blue-500/80 animate-get-code-success-bg-fade-in '>
          {' '}
          {user.lastName} {user.firstName}
        </div>
      </div>
    ));
    return selectedUser;
  };

  const onCancelAddUser = () => {
    setUser([]);
  };

  return (
    <div className='flex gap-5 justify-between  items-start min-h-[500px]'>
      <div className='w-5/12  px-3 pt-5 rounded-md shadow-user-profile max-h-[450px] overflow-auto   '>
        <div className='mb-2'>Danh sách các nhóm</div>
        {data.map(group => {
          return <StudyGroupList key={group._id} studyGroup={group.studyGroup} />;
        })}
      </div>
      <div className='w-7/12 px-3 pt-5 rounded-md shadow-user-profile min-h-[450px]   '>
        <div className='w-7/12 flex items-center gap-4    '>
          <div className='  '>
            <StudyGroupCreator className='w-full' />
          </div>
        </div>
        <div className=' w-full bg-blue-200/30 shadow-user-profile rounded-md min-h-[320px]  overflow-auto border-2 border-blue-500/40  '>
          <div className=' flex items-center gap-6 px-3 pt-3 text-sm text-center sticky z-1 backdrop-blur-sm shadow-sm top-0 mb-2 '>
            <div className='w-1/3'>
              <span> Nhóm hiện tại: </span>
              <span className='font-semibold'> 10A2</span>
            </div>
            <div className='w-1/3'>
              <span className='mr-1 font-semibold '>10/30</span>

              <FaUsers className=' align-middle ' />
            </div>
            <div className='w-full'>
              <StudyGroupSearchbar
                size='small'
                getSearchUser={getSearchUser}
                setUser={setUser}
                user={user}
              />
            </div>
          </div>

          <div className=' px-3 pt-3 max-h-[150px]  '>{user && getSearchUser()}</div>
          <div className='sticky bottom-0 right-0'>
            <Button className=' ' danger type='primary' htmlType='button' onClick={onCancelAddUser}>
              Hủy
            </Button>
            <Button className=' ' type='primary' htmlType='button'>
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupManagement;

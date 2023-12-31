import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StudyGroupCreator from './StudyGroupCreator/StudyGroupCreator';
import StudyGroupList from './StudyGroupList/StudyGroupList';
import StudyGroupSearchbar from './StudyGroupSearchbar/StudyGroupSearchbar';
import { FaUsers } from 'react-icons/fa6';
import { Button } from 'antd';
import studyGroupAPI from '~/services/studyGroupAPI';

const StudyGroupManagement = () => {
  const { data = [] } = useSelector(state => state.group.studyGroup);
  const [user, setUser] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [userAlreadyInGroup, setUserAlreadyInGroup] = useState([]);
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
  const showDuplicateUser = () => {
    const dupplicateUser = userAlreadyInGroup.map(dupUsser => (
      <div className='text-yellow-600' key={dupUsser.id}>
        {' '}
        Tài khoản {dupUsser.lastName} {dupUsser.firstName} đã trong nhóm{' '}
      </div>
    ));
    return dupplicateUser;
  };
  const onSelectedGroup = id => {
    const findSelectedGroup = data.find(group => group._id === id);

    setSelectedGroup(findSelectedGroup);
  };

  const onCancelAddUser = () => {
    setUser([]);
  };

  const onAddUserToGroup = async () => {
    try {
      const addingUser = await studyGroupAPI.addMemberToGroup(selectedGroup._id, user);
      const { duplicateUser } = addingUser.data;
      setUser([]);
      setUserAlreadyInGroup(duplicateUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex gap-5 justify-between  items-start min-h-[500px]'>
      <div className='w-5/12  px-3 pt-5 rounded-md shadow-user-profile max-h-[450px] overflow-auto   '>
        <div className='mb-2'>Danh sách các nhóm</div>
        {data.map(group => {
          return (
            <StudyGroupList
              key={group._id}
              group={group}
              onSelectedGroup={onSelectedGroup}
              selectedGroup={selectedGroup}
            />
          );
        })}
      </div>
      <div className='w-7/12 px-3 pt-5 rounded-md shadow-user-profile min-h-[450px]   '>
        <div className='w-7/12 flex items-center gap-4    '>
          <div className='  '>
            <StudyGroupCreator className='w-full' />
          </div>
        </div>
        <div className=' w-full bg-blue-200/30 shadow-user-profile rounded-md min-h-[320px]  overflow-auto border-2 border-blue-500/40  '>
          {Object.keys(selectedGroup).length !== 0 ? (
            <>
              <div className=' flex items-center gap-6 px-3 pt-3 text-sm text-center sticky z-1 backdrop-blur-sm shadow-sm top-0 mb-2 '>
                <div className='w-1/3 max-w-full'>
                  <span className='w-fit'> Nhóm hiện tại: </span>
                  <span className='font-semibold text-blue-500 w-full max-w-full '>
                    {' '}
                    {selectedGroup.studyGroup}
                  </span>
                </div>
                <div className='w-1/3'>
                  <span className='mr-1 font-semibold text-blue-500 '>
                    {selectedGroup.member.length}
                  </span>

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
              <div className=' px-3 pt-3 max-h-[150px]  '>
                {user && getSearchUser()} {userAlreadyInGroup && showDuplicateUser()}
              </div>
              <div className='sticky bottom-0 right-0'>
                <Button
                  className=' '
                  danger
                  type='primary'
                  htmlType='button'
                  onClick={onCancelAddUser}
                >
                  Hủy
                </Button>
                <Button className=' ' type='primary' htmlType='button' onClick={onAddUserToGroup}>
                  Lưu thay đổi
                </Button>
              </div>{' '}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyGroupManagement;

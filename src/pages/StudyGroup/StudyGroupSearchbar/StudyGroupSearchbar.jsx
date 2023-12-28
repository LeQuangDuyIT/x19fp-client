import Search from 'antd/es/input/Search';
import { useEffect, useRef, useState } from 'react';
import AuthAPI from '~/services/authAPI';

const StudyGroupSearchbar = ({ size, getSearchUser, setUser }) => {
  const [findUser, setFindUser] = useState('');
  const [userResult, setUserResult] = useState([]);
  const resultPanel = useRef(null);
  useEffect(() => {
    const handleClickOutSide = e => {
      if (resultPanel.current && !resultPanel.current.contains(e.target)) {
        setUserResult([]);
        setFindUser('');
      }
    };
    document.addEventListener('click', handleClickOutSide);

    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, []);
  const onFindingUser = async e => {
    const searchKey = e.target.value;
    setFindUser(searchKey);
    try {
      const findUserByKey = await AuthAPI.getUserByNameOrId(searchKey);
      const { result } = findUserByKey.data;
      setUserResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectStudent = (picture, lastName, firstName, id) => {
    const userInfor = { picture, lastName, firstName, id };

    setUser(userInfor);
  };

  return (
    <div className=' relative  w-full'>
      <Search
        value={findUser}
        onChange={e => onFindingUser(e)}
        size={size}
        placeholder='Nhập tên người dùng hoặc id'
        className='w-full'
      />
      <div
        ref={resultPanel}
        className=' absolute w-full top-7 animate-get-code-success-bg-fade-in shadow '
      >
        {userResult ? (
          userResult.map(user => (
            <div
              key={user._id}
              className='flex bg-white rounded gap-3 p-2 items-center   '
              onClick={() => onSelectStudent(user.picture, user.lastName, user.firstName, user._id)}
            >
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
          ))
        ) : (
          <div className='text-center'> Không tìm thấy người dùng </div>
        )}
      </div>
    </div>
  );
};

export default StudyGroupSearchbar;

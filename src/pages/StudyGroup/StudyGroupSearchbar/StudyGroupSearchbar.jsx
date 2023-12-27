import Search from 'antd/es/input/Search';
import { useState } from 'react';
import AuthAPI from '~/services/authAPI';

const StudyGroupSearchbar = ({ size, getSearchUser }) => {
  const [findUser, setFindUser] = useState('');
  const [userResult, setUserResult] = useState([]);
  const name = ['Nguyễn Duy Nhân'];
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

  return (
    <div className=' relative  w-full'>
      <Search
        value={findUser}
        onChange={e => onFindingUser(e)}
        size={size}
        placeholder='Nhập tên người dùng hoặc id'
        className='   w-full'
      />
      <div className=' absolute w-full top-7 ' onClick={() => getSearchUser(name)}>
        {userResult ? (
          userResult.map(user => (
            <div
              key={user._id}
              className='flex bg-white rounded gap-3 p-2 items-center animate-get-code-success-bg-fade-in shadow  '
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

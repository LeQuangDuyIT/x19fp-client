import { Input } from 'antd';
import Search from 'antd/es/input/Search';
import { memo, useState } from 'react';
import AuthAPI from '~/services/authAPI';
import accountAPI from '~/services/userAPI';

const StudyGroupSearchbar = () => {
  const [findUser, setFindUser] = useState('');
  const [userResult, setUserResult] = useState('');
  const onFindingUser = async e => {
    console.log(e.target.value);
    setFindUser(e.target.value);
    const findingUser = await AuthAPI.getUserByNameOrId(e.target.value);
    setUserResult(e.target.value);
  };
  return (
    <div className='text-red-500 w-full'>
      <Search
        value={findUser}
        onChange={e => onFindingUser(e)}
        size='large'
        placeholder='Nhập tên người dùng'
        className=' w-full'
      />
      <div> {userResult} </div>
    </div>
  );
};

export default memo(StudyGroupSearchbar);

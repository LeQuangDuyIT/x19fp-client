import Search from 'antd/es/input/Search';
import { useState } from 'react';
import AuthAPI from '~/services/authAPI';

const StudyGroupSearchbar = ({ size }) => {
  const [findUser, setFindUser] = useState('');
  const [userResult, setUserResult] = useState('');
  const onFindingUser = async e => {
    const searchKey = e.target.value;
    setFindUser(searchKey);
    try {
      const findUserByKey = await AuthAPI.getUserByNameOrId(searchKey);
      const { result } = findUserByKey.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='text-red-500 w-full'>
      <Search
        value={findUser}
        onChange={e => onFindingUser(e)}
        size={size}
        placeholder='Nhập tên người dùng hoặc id'
        className=' w-full'
      />
      <div> {findUser} </div>
    </div>
  );
};

export default StudyGroupSearchbar;

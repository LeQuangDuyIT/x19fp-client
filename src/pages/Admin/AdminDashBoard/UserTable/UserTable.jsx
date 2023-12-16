import { useContext, useEffect, useMemo, useState } from 'react';
import { StoreContext } from '~/context/storeContext/StoreContext';
import Search from 'antd/es/input/Search';
import accountAPI from '~/services/userAPI';
import { Row, Col, Checkbox, Popconfirm, Pagination } from 'antd';
import LoadingState from '~/components/LoadingState/LoadingState';
import userAPI from '~/services/userProfileApi';

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [pagination, setPagination] = useState({});
  const [selectedUser, setSelectedUser] = useState([]);
  const { setContextError } = useContext(StoreContext);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const getAllUser = await accountAPI.getAllUser({});
      const { data, paginationData } = getAllUser.data;
      setUserList(data);
      setPagination(paginationData);
    } catch (error) {
      setContextError(error);
    }
  };

  const dateToString = timeStamps => {
    const date = new Date(timeStamps);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    const formattedDate = date.toLocaleDateString(undefined, options);

    return formattedDate;
  };

  const filteredUserList = useMemo(
    () =>
      userList.filter(user => {
        return user.lastName.toLowerCase().includes(searchKeyWord.toLowerCase());
      }),
    [searchKeyWord, userList]
  );
  const handleDeleteUser = async () => {
    try {
      if (selectedUser.length === 0) {
        return;
      }
      await accountAPI.deleteUser(selectedUser);
      setSelectedUser([]);
      await fetchData();
    } catch (error) {
      setContextError(error);
    }
  };

  const onHanleChangeCheckAll = e => {
    if (e.target.checked) {
      setSelectedUser(userList.map(item => item._id));
      return;
    }
    setSelectedUser([]);
  };
  const onHanleChangeCheckSingle = id => {
    const checkIsExist = selectedUser.find(item => item == id);
    if (!checkIsExist) {
      setSelectedUser([...selectedUser, id]);
      return;
    }
    setSelectedUser(selectedUser.filter(item => item != id));
  };

  const onPageChange = async page => {
    const currentPage = {
      page,
      limit: pagination.limit
    };
    console.log(currentPage);
    const userPerPage = await accountAPI.getAllUser(currentPage);
    const { data, paginationData } = userPerPage.data;

    setUserList(data);
    setPagination(paginationData);
  };

  const onShowSizeChange = async (current, pageSize) => {
    console.log(current, pageSize);
    const page = {
      page: current,
      limit: pageSize
    };
    const getUsersPerPage = await accountAPI.getAllUser(page);
    const { data, paginationData } = getUsersPerPage.data;
    setUserList(data);
    setPagination(paginationData);
  };

  return (
    <Row className='shadow border-gray-200 border-[1px] rounded-xl '>
      <Col className='leading-[50px] border-b border-gray-200' span={24}>
        <Row className='items-center text-gray-400 '>
          <Col className='font-semibold pl-4 text-lg text-black' span={12}>
            Danh sách tài khoản
          </Col>

          <Col className='text-[13px] flex flex-grow  items-center gap-4 ' span={12}>
            <div className=' w-[200px] h-[50px] '>
              <div className='flex gap-4  items-center justify-center '>
                {true && (
                  <>
                    <div>{selectedUser.length} Selected</div>
                    <Popconfirm
                      title='Xóa đáp án'
                      description='Bạn chắc chắn muốn xóa?'
                      okText='Xóa'
                      cancelText='Đóng'
                      okButtonProps={{ danger: true }}
                      onConfirm={() => handleDeleteUser()}
                    >
                      <div className='border-[1px] leading-tight cursor-pointer border-red-500 text-red-500 text-center rounded p-3 hover:bg-red-500 hover:text-white transition-all'>
                        Delete
                      </div>
                    </Popconfirm>
                  </>
                )}
              </div>
            </div>
            Tìm kiếm{' '}
            <Search
              value={searchKeyWord}
              onChange={e => setSearchKeyWord(e.target.value)}
              size='small'
              placeholder='Nhập tên người dùng'
              className=' w-auto items-center align-middle '
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row className='text-gray-400 font-medium leading-10 border-b border-gray-200  '>
          <Col span={1} className='text-center'>
            <Checkbox
              checked={selectedUser?.length == userList.length}
              onChange={onHanleChangeCheckAll}
            />
          </Col>
          <Col className='text-[13px]' span={5}>
            {' '}
            HỌ TÊN{' '}
          </Col>
          <Col className='text-[13px]' span={4}>
            {' '}
            TÀI KHOẢN{' '}
          </Col>
          <Col className='text-[13px]' span={5}>
            EMAIL
          </Col>
          <Col className='text-[13px]' span={4}>
            ĐĂNG KÝ
          </Col>
          <Col className='text-[13px]' span={5}>
            ID
          </Col>
        </Row>
      </Col>
      <Col className='leading-10 mb-3 border-b border-gray-200 ' span={24}>
        {filteredUserList ? (
          filteredUserList.map(account => {
            return (
              <Row key={account._id}>
                <Col span={1} className='text-center'>
                  <Checkbox
                    checked={selectedUser.includes(account?._id)}
                    onChange={() => onHanleChangeCheckSingle(account._id)}
                    id={account._id}
                  />
                </Col>
                <Col span={5}>
                  <div className='flex gap-3'>
                    <div className=' '>
                      {' '}
                      <img
                        className=' w-7 h-7 rounded-full  object-cover'
                        src={account.picture ?? '../src/assets/default-avatar/user.png'}
                      />
                    </div>
                    <div className='text-[12px] font-semibold hover:text-blue-500/80 '>
                      {' '}
                      {account.lastName} {account.firstName}
                    </div>
                  </div>
                </Col>
                <Col className='text-[12px] text-gray-400 font-semibold  ' span={4}>
                  {account.accountType}
                </Col>
                <Col className='text-[12px] text-gray-400 font-semibold  ' span={5}>
                  {account.email}
                </Col>
                <Col className='text-[12px] text-gray-400 font-semibold' span={4}>
                  {dateToString(account.createdAt)}
                </Col>
                <Col className='text-[12px] text-gray-400 font-semibold truncate ... ' span={5}>
                  {account._id}
                </Col>
              </Row>
            );
          })
        ) : (
          <LoadingState />
        )}
      </Col>
      <Col className=' text-center mb-3 ' span={24}>
        <Pagination
          size='small'
          defaultCurrent={1}
          defaultPageSize={4}
          total={pagination.totalItems}
          pageSizeOptions={[4, 8, 12]}
          onShowSizeChange={onShowSizeChange}
          onChange={onPageChange}
          showSizeChanger
        />
      </Col>
    </Row>
  );
};

export default UserTable;

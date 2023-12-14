import { Row, Col, Divider, Select, Checkbox, Popconfirm } from 'antd';
import CountUp from 'react-countup';
import { FaUsers } from 'react-icons/fa6';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { PiExam } from 'react-icons/pi';
import Search from 'antd/es/input/Search';
import { useEffect, useMemo, useState } from 'react';
import accountAPI from '~/services/userAPI';
import LoadingState from '~/components/LoadingState/LoadingState';
const dashBoard = [
  { title: 'NGƯỜI DÙNG', icon: <FaUsers />, quantity: '12360' },
  { title: 'CÂU HỎI/BÀI TẬP', icon: <RiQuestionAnswerLine />, quantity: '5294' },
  { title: 'ĐỀ THI/BÀI KIỂM TRA', icon: <PiExam />, quantity: '870' },
  { title: 'MÔN HỌC/BỘ SƯU TẬP', icon: <PiExam />, quantity: '78' }
];
const AdminDashBoard = () => {
  const [userList, setUserList] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [isChecked, setIschecked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const getAllUser = await accountAPI.getAllUser();
      const { data } = getAllUser.data;
      setUserList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const dateToString = timeStamps => {
    const date = new Date(timeStamps);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    const formattedDate = date.toLocaleDateString(undefined, options);

    return formattedDate;
  };
  const deBounce = (cb, delay = 1000) => {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const filteredUserList = useMemo(
    () =>
      userList.filter(user => {
        return user.lastName.toLowerCase().includes(searchKeyWord.toLowerCase());
      }),
    [searchKeyWord, userList]
  );
  // const filteredUserList = deBounce(
  //   userList.filter(user => {
  //     return user.lastName.toLowerCase().includes(searchKeyWord.toLowerCase());
  //   }),
  //   500
  // );

  const onHanleChangeCheckAll = () => {
    setIschecked(!isChecked);
  };
  const onHanleChangeCheckSingle = (value, id) => {
    setIschecked(value);
    console.log(value);
    console.log(id);
  };
  return (
    <>
      <Row>
        <Col className='px-4' span={24}>
          <div className='text-base text-gray-400 font-semibold'> TỔNG QUAN </div>
          <Divider style={{ borderBottomWidth: '3px' }} />
        </Col>
      </Row>
      <Row className='px-4 mb-7' gutter={20}>
        {dashBoard.map(section => {
          return (
            <Col key={section.title} span={6}>
              <div className=' font-semibold rounded-xl p-3 h-auto shadow-lg shadow-blue-300/40 '>
                <div className=' text-center text-sm text-gray-400 mb-2 '>
                  <span className='mr-3'>{section.icon}</span>
                  <span> {section.title} </span>
                </div>
                <div className='font-semibold text-center text-2xl text-blue-500/80 '>
                  {' '}
                  <CountUp start={0} end={section.quantity} duration={2.5} separator=',' />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row className='shadow border-gray-200 border-[1px] rounded-xl '>
        <Col className='leading-[50px] border-b border-gray-200' span={24}>
          <Row className='items-center text-gray-400 '>
            <Col className='font-semibold pl-4 text-lg text-black' span={12}>
              Danh sách tài khoản
            </Col>

            <Col className='text-[13px] flex flex-grow  items-center gap-4 ' span={12}>
              <div className=' w-[200px] h-[50px] '>
                <div className='flex gap-4  items-center justify-center '>
                  {isChecked && (
                    <>
                      <div>1 Selected</div>
                      <Popconfirm
                        title='Xóa đáp án'
                        description='Bạn chắc chắn muốn xóa?'
                        okText='Xóa'
                        cancelText='Đóng'
                        okButtonProps={{ danger: true }}
                        // onConfirm={() => onHanleChangeCheckSingle()}
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
              <Checkbox onChange={onHanleChangeCheckAll} />
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
        <Col className='leading-10' span={24}>
          {filteredUserList ? (
            filteredUserList.map(account => {
              return (
                <Row key={account._id}>
                  <Col span={1} className='text-center'>
                    <Checkbox
                      onChange={e => onHanleChangeCheckSingle(e.target.checked, account._id)}
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
        <Col span={24}>UserTablePagination</Col>
      </Row>
    </>
  );
};

export default AdminDashBoard;

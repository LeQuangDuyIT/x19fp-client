import { Row, Col, Divider, Select, Checkbox } from 'antd';
import CountUp from 'react-countup';
import { FaUsers } from 'react-icons/fa6';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { PiExam } from 'react-icons/pi';
import Search from 'antd/es/input/Search';

const dashBoard = [
  { title: 'NGƯỜI DÙNG', icon: <FaUsers />, quantity: '12360' },
  { title: 'CÂU HỎI/BÀI TẬP', icon: <RiQuestionAnswerLine />, quantity: '5294' },
  { title: 'ĐỀ THI/BÀI KIỂM TRA', icon: <PiExam />, quantity: '870' },
  { title: 'MÔN HỌC/BỘ SƯU TẬP', icon: <PiExam />, quantity: '78' }
];
const AdminDashBoard = () => {
  const onHanleSearch = values => {
    console.log(values);
  };
  const onHanleChangeSearch = e => {
    console.log(e.target.value);
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
            <Col className='font-semibold pl-4 text-lg text-black' span={16}>
              Danh sách tài khoản
            </Col>

            <Col className='text-[13px]' span={8}>
              Tìm kiếm{' '}
              <Search
                onChange={onHanleChangeSearch}
                onSearch={onHanleSearch}
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
              <Checkbox />
            </Col>
            <Col className='text-[13px]' span={7}>
              {' '}
              HỌ TÊN{' '}
            </Col>
            <Col className='text-[13px]' span={4}>
              {' '}
              TÀI KHOẢN{' '}
            </Col>
            <Col className='text-[13px]' span={4}>
              EMAIL
            </Col>
            <Col className='text-[13px]' span={4}>
              ĐĂNG KÝ
            </Col>
            <Col className='text-[13px]' span={4}>
              ID
            </Col>
          </Row>
        </Col>
        <Col className='leading-10' span={24}>
          <Row>
            <Col span={1} className='text-center'>
              <Checkbox />
            </Col>
            <Col span={7}>
              <div className='flex gap-3'>
                <div className=' '>
                  {' '}
                  <img
                    className=' w-7 h-7 rounded-full  object-cover'
                    src='../src/assets/default-avatar/user.png'
                  />
                </div>
                <div className='text-[12px] font-semibold hover:text-blue-500/80 '>
                  {' '}
                  Nguyễn Duy Nhân{' '}
                </div>
              </div>
            </Col>
            <Col className='text-[12px] text-gray-400 font-semibold  ' span={4}>
              Giảng viên
            </Col>
            <Col className='text-[12px] text-gray-400 font-semibold  ' span={4}>
              {' '}
              duynhannguyenn@gmail.com{' '}
            </Col>
            <Col className='text-[12px] text-gray-400 font-semibold' span={4}>
              28-11-2023
            </Col>
            <Col className='text-[12px] text-gray-400 font-semibold truncate ... ' span={4}>
              6565b74ea30775e0d8efa74e
            </Col>
          </Row>
          <Row>
            <Col span={1} className='text-center'>
              <Checkbox />
            </Col>
            <Col span={7}>
              <div className='flex gap-3'>
                <div className=' '>
                  {' '}
                  <img
                    className=' w-7 h-7 rounded-full  object-cover'
                    src='../src/assets/default-avatar/user.png'
                  />
                </div>
                <div className='text-[12px] font-semibold hover:text-blue-500/80 '>
                  {' '}
                  Nguyễn Duy Nhân{' '}
                </div>
              </div>
            </Col>
            <Col className='text-[12px] text-gray-400 font-semibold  ' span={4}>
              Giảng viên
            </Col>
            <Col className='text-[12px] text-gray-400 font-semibold  ' span={4}>
              {' '}
              duynhannguyenn@gmail.com{' '}
            </Col>
            <Col className='text-[12px] text-gray-400 font-semibold' span={4}>
              28-11-2023
            </Col>
            <Col className='text-[12px] text-gray-400 font-semibold truncate ... ' span={4}>
              6565b74ea30775e0d8efa74e
            </Col>
          </Row>
        </Col>
        <Col span={24}>UserTablePagination</Col>
      </Row>
    </>
  );
};

export default AdminDashBoard;

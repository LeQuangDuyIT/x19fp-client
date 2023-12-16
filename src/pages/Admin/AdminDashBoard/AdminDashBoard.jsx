import { Row, Col, Divider } from 'antd';
import CountUp from 'react-countup';
import { FaUsers } from 'react-icons/fa6';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { PiExam } from 'react-icons/pi';
import UserTable from './UserTable/UserTable';

const dashBoard = [
  { title: 'NGƯỜI DÙNG', icon: <FaUsers />, quantity: '1' },
  { title: 'CÂU HỎI/BÀI TẬP', icon: <RiQuestionAnswerLine />, quantity: '1' },
  { title: 'ĐỀ THI/BÀI KIỂM TRA', icon: <PiExam />, quantity: '1' },
  { title: 'MÔN HỌC/BỘ SƯU TẬP', icon: <PiExam />, quantity: '1' }
];
const AdminDashBoard = () => {
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
      <UserTable />
    </>
  );
};

export default AdminDashBoard;

import { Row, Col } from 'antd';
import CountUp from 'react-countup';
import { FaUsers } from 'react-icons/fa6';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { PiExam } from 'react-icons/pi';

const AdminDashBoard = () => {
  const dashBoard = [
    { title: 'NGƯỜI DÙNG', icon: <FaUsers />, quantity: '12360' },
    { title: 'CÂU HỎI/BÀI TẬP', icon: <RiQuestionAnswerLine />, quantity: '5294' },
    { title: 'ĐỀ THI/BÀI KIỂM TRA', icon: <PiExam />, quantity: '870' },
    { title: 'MÔN HỌC/BỘ SƯU TẬP', icon: <PiExam />, quantity: '78' }
  ];
  return (
    <Row className='px-4' gutter={20}>
      {dashBoard.map(section => {
        return (
          <Col span={6}>
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
      {/* <Col span={6}>
        <div className=' font-semibold rounded-xl p-3 h-auto shadow-lg shadow-blue-300/40 '>
          <div className=' text-center text-sm text-gray-400 mb-2 '>
            <FaUsers className='mr-3' />
            <span> NGƯỜI DÙNG </span>
          </div>
          <div className='font-semibold text-center text-2xl text-blue-500/80 '>
            {' '}
            <CountUp start={0} end={10000} duration={2.5} separator=',' />
          </div>
        </div>
      </Col> */}

      {/* <Col span={6}>
        Tổng số câu hỏi, bài tập <CountUp start={0} end={10000} duration={4} />
      </Col>
      <Col span={6}>
        Tổng số Đề thi, kiểm tra <CountUp start={0} end={300} duration={4} />
      </Col>
      <Col span={6}>
        Tổng số môn học <CountUp start={0} end={20} duration={4} />
      </Col> */}
    </Row>
  );
};

export default AdminDashBoard;

import { Row, Col } from 'antd';
import CountUp from 'react-countup';
const AdminDashBoard = () => {
  return (
    <Row>
      <Col span={6}>
        Tổng người dùng
        <CountUp start={0} end={100} duration={4} />
      </Col>

      <Col span={6}>
        Tổng số câu hỏi, bài tập <CountUp start={0} end={500} duration={4} />
      </Col>
      <Col span={6}>
        Tổng số Đề thi, kiểm tra <CountUp start={0} end={300} duration={4} />
      </Col>
      <Col span={6}>
        Tổng số môn học <CountUp start={0} end={20} duration={4} />
      </Col>
    </Row>
  );
};

export default AdminDashBoard;

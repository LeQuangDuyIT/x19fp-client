import { Col, Row } from 'antd';
import Container from '~/components/Container';

const TestCreator = () => {
  return (
    <div className='bg-[#f4f5f8] pt-[60px]'>
      <Container>
        <Row gutter={60} className='justify-between min-h-screen'>
          <Col span={6}></Col>
          <Col span={18} className='mx-auto'></Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestCreator;

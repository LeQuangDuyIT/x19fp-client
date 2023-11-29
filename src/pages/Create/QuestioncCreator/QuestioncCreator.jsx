import { Col, Row } from 'antd';
import Container from '~/components/Container';
import AsideSection from './_AsideSection';
import QuestionCreatorBox from '~/components/QuestionCreatorBox';

const QuestioncCreator = () => {
  return (
    <div className='bg-[#f4f5f8] pt-[60px]'>
      <Container>
        <Row gutter={60} className='justify-between min-h-screen'>
          <Col span={6}>
            <AsideSection />
          </Col>
          <Col span={18}>
            <QuestionCreatorBox />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuestioncCreator;

import { Col, Row } from 'antd';
import Container from '~/components/Container';
import CreateHeader from './CreateHeader';
import AsideSection from './AsideSection';
import MainSection from './MainSection';

const Create = () => {
  return (
    <div>
      <CreateHeader />
      <div className='bg-[#f4f5f8] pt-[60px]'>
        <Container>
          <Row gutter={60} className='justify-between min-h-screen'>
            <Col span={6}>
              <AsideSection />
            </Col>
            <Col span={18}>
              <MainSection />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Create;

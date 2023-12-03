import { createContext, useState } from 'react';
import { Col, Row } from 'antd';
import Container from '~/components/Container';
import TestCreatorDashboard from '~/pages/Create/TestCreator/_TestCreatorDashboard';
import TestCreatorController from './_TestCreatorController';

export const CreateTestContext = createContext();

const initalOverviewValue = {
  title: '',
  description: '',
  subject: null,
  limitTime: null
};

const TestCreator = () => {
  const [overviewValue, setOverviewValue] = useState(initalOverviewValue);
  const [questionSections, setQuestionSections] = useState(1);

  const onOverviewInputChange = (name, value) => {
    const newValue = { ...overviewValue, [name]: value };
    setOverviewValue(newValue);
  };

  return (
    <CreateTestContext.Provider value={{ overviewValue, onOverviewInputChange }}>
      <div className='bg-[#f4f5f8] pt-[60px]'>
        <Container>
          <Row gutter={60} className='justify-between min-h-screen'>
            <Col span={18}>
              <TestCreatorDashboard />
            </Col>
            <Col span={6} className='mx-auto'>
              <TestCreatorController />
            </Col>
          </Row>
        </Container>
      </div>
    </CreateTestContext.Provider>
  );
};

export default TestCreator;

import { createContext, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Container from '~/components/Container';
import TestCreatorDashboard from '~/pages/Create/TestCreator/_TestCreatorDashboard';
import TestCreatorController from './_TestCreatorController';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestById } from '~/redux/test/testAction';

export const CreateTestContext = createContext();

const initalOverviewValue = {
  title: '',
  description: '',
  subject: null,
  limitTime: null
};

const TestCreator = () => {
  const { id } = useParams();
  const [overviewValue, setOverviewValue] = useState(initalOverviewValue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTestById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

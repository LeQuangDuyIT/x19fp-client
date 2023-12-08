import { createContext, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Container from '~/components/Container';
import TestCreatorDashboard from '~/pages/Create/TestCreator/_TestCreatorDashboard';
import TestCreatorController from './_TestCreatorController';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestById } from '~/redux/test/testAction';
import useDebounce from '~/hooks/useDebounce';
import TestAPI from '~/services/testAPI';

export const CreateTestContext = createContext();

const initalOverviewValue = {
  title: '',
  description: '',
  subject: null,
  limitTime: null,
  grade: null
};

const TestCreator = () => {
  const { id } = useParams();
  const [overviewValue, setOverviewValue] = useState(initalOverviewValue);
  const { currentUser } = useSelector(state => state.user);
  const { test, questions } = useSelector(state => state.test);
  const dispatch = useDispatch();
  const overviewValueDebounce = useDebounce(overviewValue);

  useEffect(() => {
    handleFetchTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchTest = async () => {
    const res = await dispatch(fetchTestById(id));
    const fetchedTest = res.payload;
    if (!fetchedTest) return;
    const { title, description, subject, limitTime, grade } = fetchedTest;
    setOverviewValue({ title, description, subject, limitTime, grade });
  };

  useEffect(() => {
    if (!id || !currentUser) return;
    handleUpdateTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overviewValue]);

  const handleUpdateTest = async () => {
    if (questions.length === 0) return;
    const questionIds = questions.map(question => question._id);
    const updatedTest = {
      ...test,
      questions: questionIds,
      ...overviewValueDebounce
    };
    try {
      await TestAPI.updateTestById(test._id, updatedTest);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const onOverviewInputChange = (name, value) => {
    const newValue = { ...overviewValue, [name]: value };
    setOverviewValue(newValue);
  };

  console.log(test);

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

import { Col, Row } from 'antd';
import CollectionSection from '~/components/CollectionSection';
import Container from '~/components/Container';
import Header from '~/components/Header';
import { useEffect, useState } from 'react';
import TestAPI from '~/services/testAPI';
import { useNavigate } from 'react-router-dom';

const MyTests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchTestsOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTestsOfUser = async () => {
    try {
      const res = await TestAPI.getMyTests();
      console.log(res);
      setTests(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <>
      <div className='bg-[#2e6bed]'>
        <Container>
          <Header />
        </Container>
      </div>
      <div className='bg-[#f4f5f8] pt-[60px]'>
        <Container>
          <Row gutter={60} className='justify-between min-h-screen'>
            <Col span={6}>
              <CollectionSection />
            </Col>
            <Col span={18} className='mx-auto'>
              <div className='flex flex-col gap-4'>
                {tests &&
                  tests.length > 0 &&
                  tests.map(test => (
                    <div key={test._id} onClick={() => navigate(`/create/test/${test._id}`)}>
                      <h3>{test.title}</h3>
                    </div>
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MyTests;

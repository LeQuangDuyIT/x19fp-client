import { Col, Modal, Row } from 'antd';
import CollectionSection from '~/components/CollectionSection';
import Container from '~/components/Container';
import Header from '~/components/Header';
import { useEffect, useState } from 'react';
import TestAPI from '~/services/testAPI';
import { useNavigate } from 'react-router-dom';
import RecordAPI from '~/services/recordAPI';

const MyTests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [openRecords, setOpenRecords] = useState(false);
  const [recordsOfTest, setRecordsOfTest] = useState([]);

  useEffect(() => {
    fetchTestsOfUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTestsOfUser = async () => {
    try {
      const res = await TestAPI.getMyTests();
      setTests(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleShowRecordsOfTest = async testId => {
    setOpenRecords(true);
    try {
      const res = await RecordAPI.getByTestId(testId);
      setRecordsOfTest(res.data.data);
    } catch (error) {
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
                    <div key={test._id} className='flex justify-between'>
                      <h3 onClick={() => navigate(`/create/test/${test._id}`)}>{test.title}</h3>
                      <a onClick={() => handleShowRecordsOfTest(test._id)}>Bài nộp</a>
                    </div>
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal title='Danh sách bài nộp' open={openRecords} onCancel={() => setOpenRecords(false)}>
        <div className='flex flex-col gap-4'>
          {recordsOfTest.map(record => (
            <div key={record._id} className='flex flex-col'>
              <h4>{record.userFullname}</h4>
              <p>{record.userEmail}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default MyTests;

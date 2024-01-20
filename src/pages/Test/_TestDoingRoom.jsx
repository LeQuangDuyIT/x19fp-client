import { Button, Col, Modal, Row } from 'antd';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import Container from '~/components/Container';
import MultipleChoice from '../Question/_MultipleChoice';
import { useEffect, useState } from 'react';
import RecordAPI from '~/services/recordAPI';

const TestDoingRoom = ({ recordData }) => {
  const { title, questions } = recordData;
  const [studentAnswers, setStudentAnswers] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [finishData, setFinishData] = useState(null);

  useEffect(() => {
    if (!questions) return;
    const initAnswers = questions.map((question, index) => ({
      index,
      id: question._id,
      answer: null
    }));
    setStudentAnswers(initAnswers);
  }, [questions]);

  const handleSetAnswer = (id, answer, score) => {
    const newAnswersData = studentAnswers.map(item =>
      item.id === id ? { ...item, answer, score } : item
    );
    setStudentAnswers(newAnswersData);
  };

  const handleSubmit = async () => {
    setShowResult(true);
    const payload = { ...recordData, studentAnswers };
    try {
      const res = await RecordAPI.updateById(recordData._id, payload);
      setFinishData(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className='bg-[#f4f5f8] pt-[60px]'>
      <Container>
        <Row gutter={60} className='justify-between min-h-screen'>
          <Col span={17}>
            <div className='flex flex-col gap-6'>
              {questions.map(question => (
                <MultipleChoice
                  key={question._id}
                  question={question}
                  handleSetAnswer={answer => handleSetAnswer(question._id, answer, question.score)}
                  showResult={showResult}
                />
              ))}
            </div>
          </Col>
          <Col span={7} className='flex flex-col gap-4 mx-auto'>
            <BlockSectionWrapper>
              <div className='p-4'>
                <h4>dsfdsfsd</h4>
              </div>
            </BlockSectionWrapper>
            <BlockSectionWrapper>
              <Button type='primary' size='large' className='w-full' onClick={handleSubmit}>
                Nộp bài
              </Button>
            </BlockSectionWrapper>
          </Col>
        </Row>
      </Container>
      <Modal open={finishData} onCancel={() => setFinishData(null)}>
        <div className='flex flex-col gap-8'>
          <div className='text-center'>
            <p className='text-4xl mb-2'>{finishData?.isPassed ? '🎉' : ':(('}</p>
            <h1>{finishData?.isPassed ? 'Chúc mừng bạn' : 'Không đủ điểm đậu'}</h1>
          </div>
          <div>
            <h2>Điểm: {finishData?.totalScore}</h2>
            <h2>
              Số câu đúng: {finishData?.correct} / {questions.length}
            </h2>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TestDoingRoom;

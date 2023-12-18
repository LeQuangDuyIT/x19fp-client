import { Col, Row } from 'antd';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import Container from '~/components/Container';
import MultipleChoice from '../Question/_MultipleChoice';
import { useEffect, useState } from 'react';

const TestDoingRoom = ({ recordData }) => {
  const { title, questions } = recordData;
  const [studentAnswers, setStudentAnswers] = useState(null);

  useEffect(() => {
    if (!questions) return;
    const initAnswers = questions.map((question, index) => ({
      index,
      id: question._id,
      answer: null
    }));
    setStudentAnswers(initAnswers);
  }, [questions]);

  const handleSetAnswer = (id, answer) => {
    const newAnswersData = studentAnswers.map(item =>
      item.id === id ? { ...item, answer } : item
    );
    setStudentAnswers(newAnswersData);
  };

  return (
    <div className='bg-[#f4f5f8] pt-[60px]'>
      <Container>
        <Row gutter={60} className='justify-between min-h-screen'>
          <Col span={17}>
            <div>
              {questions.map(question => (
                <MultipleChoice
                  key={question._id}
                  question={question}
                  handleSetAnswer={answer => handleSetAnswer(question._id, answer)}
                />
              ))}
            </div>
          </Col>
          <Col span={7} className='mx-auto'>
            <BlockSectionWrapper>
              <div className='p-4'>
                <h4>dsfdsfsd</h4>
              </div>
            </BlockSectionWrapper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestDoingRoom;

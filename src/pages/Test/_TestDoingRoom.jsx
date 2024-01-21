import { Button, Col, Modal, Row } from 'antd';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import Container from '~/components/Container';
import MultipleChoice from '../Question/_MultipleChoice';
import { useEffect, useMemo, useState } from 'react';
import RecordAPI from '~/services/recordAPI';
import { alphabet } from '~/utils/constants';
import clsx from 'clsx';

const TestDoingRoom = ({ recordData }) => {
  const { questions } = recordData;
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

  const maxAnswersQuantity = useMemo(() => {
    return questions.reduce((max, question) => {
      if (question.answers.length > max) {
        return question.answers.length;
      } else {
        return max;
      }
    }, 4);
  }, [questions]);

  return (
    <div className='bg-[#f4f5f8] pt-[60px]'>
      <Container>
        <Row gutter={60} className='justify-between min-h-screen'>
          <Col span={17}>
            <div className='flex flex-col gap-6'>
              {questions.map((question, index) => (
                <div key={question._id}>
                  <div className='flex gap-1'>
                    <h3 className='block w-fit mb-1 py-2 px-4 bg-[#ccc] rounded-t-md text-white'>
                      <span className='font-bold'>Câu {index + 1}: </span>
                      {question.score && <span className='italic'>({question.score} điểm)</span>}
                    </h3>
                  </div>
                  <MultipleChoice
                    question={question}
                    handleSetAnswer={answer =>
                      handleSetAnswer(question._id, answer, question.score)
                    }
                    showResult={showResult}
                    isDoingTest
                  />
                </div>
              ))}
            </div>
          </Col>
          <Col span={7}>
            <div className='sticky top-4 flex flex-col gap-4 mx-auto'>
              <BlockSectionWrapper title='Bài làm'>
                <div className='flex flex-col gap-1 p-4'>
                  <div className='flex gap-1 border-b-[2px] mb-4'>
                    {Array.from({ length: maxAnswersQuantity + 1 }).map((_, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-center w-[calc(20%-4px*4/5)] h-8 font-bold'
                      >
                        {index > 0 ? alphabet[index - 1] : ''}
                      </div>
                    ))}
                  </div>
                  <div className='flex flex-col gap-1'>
                    {questions.map((question, questionIndex) => (
                      <div key={question._id} className='flex gap-1'>
                        {Array.from({ length: maxAnswersQuantity + 1 }).map((_, answerIndex) => (
                          <div
                            key={answerIndex}
                            className={clsx(
                              'flex items-center justify-center w-[calc(20%-4px*4/5)] h-10 font-bold',
                              {
                                'bg-blue-50 text-green-500 font-bold text-2xl':
                                  (answerIndex <= question.answers.length) & (answerIndex !== 0)
                              }
                            )}
                          >
                            {answerIndex === 0
                              ? `Câu ${questionIndex + 1}`
                              : studentAnswers &&
                                question.answers[answerIndex - 1]?.id ===
                                  studentAnswers[questionIndex]?.answer?.id &&
                                question.answers[answerIndex - 1]?.id &&
                                '✔'}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </BlockSectionWrapper>
              <BlockSectionWrapper>
                <Button type='primary' size='large' className='w-full' onClick={handleSubmit}>
                  Nộp bài
                </Button>
              </BlockSectionWrapper>
            </div>
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

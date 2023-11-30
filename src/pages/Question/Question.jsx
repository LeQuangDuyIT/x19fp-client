import parser from 'html-react-parser';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import Container from '~/components/Container';
import SimpleHeader from '~/layouts/SimpleHeader';
import QuestionAPI from '~/services/questionAPI';
import { alphabet } from '~/utils/constants';

const Question = () => {
  const [question, setQuestion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await QuestionAPI.getById(id);
      setQuestion(res.data.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  if (!question) return <></>;
  return (
    <>
      <SimpleHeader />
      <div className='bg-[#f4f5f8] pt-[60px]'>
        <Container>
          <Row gutter={60} className='justify-between min-h-screen'>
            <Col span={6}>
              <BlockSectionWrapper>
                <p>Hay</p>
              </BlockSectionWrapper>
            </Col>
            <Col span={16} className='mx-auto'>
              <div className='flex flex-col gap-4 text-base'>
                <BlockSectionWrapper>
                  <p className=''>{parser(question.topic)}</p>
                </BlockSectionWrapper>
                <BlockSectionWrapper>
                  <div className='flex flex-col gap-4'>
                    {question.answers.map((answer, index) => (
                      <div key={answer.id}>
                        <p className='flex'>
                          <span className='w-6'>{alphabet[index]}.</span>
                          {parser(answer.content)}
                        </p>
                      </div>
                    ))}
                  </div>
                </BlockSectionWrapper>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Question;

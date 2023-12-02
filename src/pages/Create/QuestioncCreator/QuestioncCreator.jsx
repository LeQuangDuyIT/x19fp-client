import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import Container from '~/components/Container';
import AsideSection from './_AsideSection';
import QuestionCreatorBox from '~/components/QuestionCreatorBox';
import { fetchCollections } from '~/redux/collection/collectionAction';

const QuestioncCreator = () => {
  const { collections } = useSelector(state => state.collection);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollections());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='bg-[#f4f5f8] pt-[60px]'>
      <Container>
        <Row gutter={60} className='justify-between min-h-screen'>
          <Col span={6}>
            <AsideSection />
          </Col>
          <Col span={18} className='mx-auto'>
            <QuestionCreatorBox />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuestioncCreator;

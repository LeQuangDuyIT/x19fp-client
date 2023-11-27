import { Button, Col, Row } from 'antd';
import { CheckSquareOutlined, CaretDownOutlined } from '@ant-design/icons';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import MultipleChoiceCreator from '~/components/MultipleChoiceCreator';
import MathEditor from '~/components/MathEditor';

const MainSection = () => {
  return (
    <BlockSectionWrapper className='h-auto'>
      <Row gutter={16}>
        <Col span={18} className='flex flex-col gap-16'>
          <MultipleChoiceCreator />
          <MathEditor />
        </Col>
        <Col span={6}>
          <Button className='w-full h-auto p-4 flex gap-4 justify-between items-center border border-[#ccc] rounded-md text-base cursor-pointer'>
            <div className='flex items-center gap-3'>
              <CheckSquareOutlined />
              <span>Trắc nghiệm 1 đáp án</span>
            </div>
            <CaretDownOutlined />
          </Button>
        </Col>
      </Row>
    </BlockSectionWrapper>
  );
};

export default MainSection;

import { Button, Col, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CheckSquareOutlined, CaretDownOutlined } from '@ant-design/icons';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';

const MainSection = () => {
  return (
    <BlockSectionWrapper>
      <Row gutter={16}>
        <Col span={18}>
          <TextArea
            placeholder='Đề bài'
            allowClear
            autoSize={{ minRows: 6, maxRows: 24 }}
            className='text-lg'
          />
          <div></div>
        </Col>
        <Col span={6}>
          <Button className='w-full h-auto p-4 flex gap-4 justify-between items-center border border-black/10 rounded-md text-base cursor-pointer'>
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

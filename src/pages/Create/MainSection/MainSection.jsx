import { Button, Col, Form, Row } from 'antd';
import { CheckSquareOutlined, CaretDownOutlined } from '@ant-design/icons';
import BlockSectionWrapper from '~/components/BlockSectionWrapper';
import MultipleChoiceCreator from '~/components/MultipleChoiceCreator';
import MathEditor from '~/components/MathEditor';

const MainSection = () => {
  const [form] = Form.useForm();

  const handleCreateQuestion = formValue => {
    console.log(formValue);
  };

  return (
    <BlockSectionWrapper className='h-auto'>
      <Row gutter={16}>
        <Col span={18} className='flex flex-col gap-8'>
          <MultipleChoiceCreator form={form} handleSubmit={handleCreateQuestion} />
          <MathEditor />
        </Col>
        <Col span={6} className='flex flex-col gap-2'>
          <Button className='w-full h-[56px] p-4 flex gap-4 justify-between items-center border border-[#ccc] rounded-md text-base cursor-pointer'>
            <div className='flex items-center gap-3'>
              <CheckSquareOutlined />
              <span>Trắc nghiệm 1 đáp án</span>
            </div>
            <CaretDownOutlined />
          </Button>
          <Button type='primary' className='w-full h-[56px]' onClick={() => form.submit()}>
            Lưu
          </Button>
        </Col>
      </Row>
    </BlockSectionWrapper>
  );
};

export default MainSection;

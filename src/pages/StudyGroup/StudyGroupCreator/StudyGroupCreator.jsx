import { Button, Form, Input } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
const StudyGroupCreator = () => {
  const onHandleSubmit = values => {
    console.log('value', values);
  };
  return (
    <div className='text-red-500 '>
      <Form
        layout='inline'
        labelCol={{
          span: 0
        }}
        wrapperCol={{
          span: 24
        }}
        onFinish={onHandleSubmit}
      >
        <Form.Item name='studyGroup'>
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24
          }}
        >
          <Button
            className='w-full border-2 border-blue-500 text-center items-center  hover:bg-blue-200  '
            type=''
            htmlType='submit'
            icon={<PlusOutlined />}
            block
            size='middle'
          >
            Thêm nhóm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StudyGroupCreator;

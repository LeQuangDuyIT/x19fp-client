import { Button, Form, Input } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import studyGroupAPI from '~/services/studyGroupAPI';
const StudyGroupCreator = () => {
  const [form] = Form.useForm();

  const onHandleSubmit = async values => {
    if (!values) {
      return;
    }
    try {
      const sendGroupToServer = await studyGroupAPI.createGroup(values);
      const { message } = sendGroupToServer.data;
      form.resetFields(['studyGroup']);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='text-red-500 '>
      <Form
        form={form}
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
          <Input className='border-blue-500' placeholder='Tạo nhóm tại đây' />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24
          }}
        >
          <Button
            className='w-full border-2 border-blue-500 text-center items-center  hover:bg-blue-200  '
            htmlType='submit'
            icon={<PlusOutlined />}
            block
            size='middle'
          >
            Tạo nhóm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StudyGroupCreator;

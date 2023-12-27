import { Button, Form, Input, message } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import studyGroupAPI from '~/services/studyGroupAPI';
import { useDispatch } from 'react-redux';
import { fetchStudyGroup } from '~/redux/studyGroup/studyGroupAction';
import { useState } from 'react';
const StudyGroupCreator = () => {
  const [responeseMess, setResponseMess] = useState('');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const countDownMessage = () => {
    setTimeout(() => {
      setResponseMess('');
    }, 2000);

    return (
      <div
        className={`${
          responeseMess.status === 200 ? 'text-green-500' : 'text-red-500'
        }   animate-get-code-success-bg-fade-in   `}
      >
        {responeseMess.message}
      </div>
    );
  };
  const onHandleSubmit = async values => {
    if (!values) {
      return;
    }
    try {
      const sendGroupToServer = await studyGroupAPI.createGroup(values);
      const { status, data } = sendGroupToServer;
      const response = { status, message: data.message };
      setResponseMess(response);
      dispatch(fetchStudyGroup());
      form.resetFields(['studyGroup']);
    } catch (error) {
      setResponseMess(error);
      form.resetFields(['studyGroup']);
    }
  };
  return (
    <div className=''>
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
      <div className='min-h-[30px]'>{responeseMess && countDownMessage()}</div>
    </div>
  );
};

export default StudyGroupCreator;

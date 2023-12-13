import { useSelector } from 'react-redux';
import { GoBook } from 'react-icons/go';
import { PiStudent } from 'react-icons/pi';
import { Divider, Form, InputNumber, Select, Switch, Modal, Input, DatePicker } from 'antd';

const limitTimeOptions = [
  { value: 15, label: '15 phút' },
  { value: 30, label: '30 phút' },
  { value: 45, label: '45 phút' },
  { value: 60, label: '60 phút' },
  { value: 90, label: '90 phút' },
  { value: 180, label: '180 phút' },
  { value: 'unlimit', label: 'Không giới hạn' }
];

const TestStartingForm = ({ open, onCancel }) => {
  const { test, questions } = useSelector(state => state.test);
  const [form] = Form.useForm();

  return (
    <Modal open={open} onCancel={onCancel} okText='Đăng' cancelText='Đóng'>
      <div className='flex flex-col gap-4'>
        <h1>{test.title}</h1>
        <div className='flex gap-16'>
          <div className='flex items-center gap-2'>
            <GoBook className='text-xl' />
            <h3>{test.subject}</h3>
          </div>
          <div className='flex items-center gap-2'>
            <PiStudent className='text-xl' />
            <h3>{test.subject}</h3>
          </div>
        </div>
        <Divider />
        <div>
          <Form className='w-full' layout='vertical'>
            <div className='w-full flex gap-4'>
              <Form.Item className='flex-1' label='Thời gian làm bài'>
                <Select options={limitTimeOptions} />
              </Form.Item>
              <Form.Item className='flex-1' label='Điểm chuẩn'>
                <InputNumber className='w-full' min={0} max={10} />
              </Form.Item>
              <Form.Item className='flex-1' label='Số lần được làm lại'>
                <InputNumber className='w-full' min={0} max={10} />
              </Form.Item>
            </div>
            <div>
              <Form.Item label='Thời gian diễn ra'>
                <DatePicker.RangePicker showTime allowClear placeholder={['Bắt đầu', 'Kết thúc']} />
              </Form.Item>
            </div>
            <div>
              <Form.Item className='flex-1' label='Mật khẩu truy cập'>
                <Input className='w-full' />
              </Form.Item>
            </div>
            <div>
              <Form.Item label='Trả kết quả ngay'>
                <Switch />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default TestStartingForm;

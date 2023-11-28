import { useContext } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { validationSchema } from '~/validationSchema/authValidationSchema';
import { StoreContext } from '~/context/storeContext/StoreContext';
import authApi from '~/services/authAPI';

const Signup = () => {
  const { setLoading, error, setError } = useContext(StoreContext);
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };
  const margin = {
    margin: '0px'
  };

  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      setLoading(true);
      setError(null);
      await validationSchema.signupValidationSchema.validate(values);
      await authApi.signup(values);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
        style={{
          width: 70
        }}
      ></Select>
    </Form.Item>
  );

  return (
    <div className='flex justify-center w-full '>
      <div className='w-8/12 h-screen'>
        <img className='w-full h-full object-cover ' src='./src/assets/loginPoster.jpg' />
      </div>
      <div className='w-4/12 p-5 flex justify-center items-center '>
        <div>
          {error && <div>{error} </div>}
          <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            initialValues={{
              prefix: '+84'
            }}
            style={{
              margin
              // maxWidth: 600,
            }}
            layout='vertical'
            scrollToFirstError
          >
            <Form.Item
              name='firstName'
              label='Họ'
              rules={[
                {
                  required: true,
                  message: 'Hãy điền họ '
                }
              ]}
            >
              <Input style={{ width: 'full' }} />
            </Form.Item>
            <Form.Item
              name='lastName'
              label='Tên'
              rules={[
                {
                  required: true,
                  message: 'Hãy điền tên '
                }
              ]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name='email'
              label='E-mail'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mật khẩu'
                }
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The new password that you entered do not match!')
                    );
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='phoneNumber'
              label='Phone Number'
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!'
                }
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '100%'
                }}
              />
            </Form.Item>
            <Form.Item
              name='accountType'
              label='Loại tài khoản'
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn loại tài khoản'
                }
              ]}
            >
              <Select placeholder='Hãy chọn loại tài khoản'>
                <Option value='Học viên'>Học viên</Option>
                <Option value='Giảng viên'>Giảng viên</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name='gender'
              label='Gender'
              rules={[
                {
                  required: true,
                  message: 'Please select gender!'
                }
              ]}
            >
              <Select placeholder='select your gender'>
                <Option value='Nam'>Nam</Option>
                <Option value='Nữ'>Nữ</Option>
                <Option value='Khác'>Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item label='Captcha' extra='We must make sure that your are a human.'>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name='captcha'
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Please input the captcha you got!'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button>Get captcha</Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              name='agreement'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))
                }
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href=''>agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit' className='bg-blue-500'>
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

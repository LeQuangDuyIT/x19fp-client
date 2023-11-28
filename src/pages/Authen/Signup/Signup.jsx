import { useContext, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { validationSchema } from '~/validationSchema/authValidationSchema';
import { StoreContext } from '~/context/storeContext/StoreContext';
import authApi from '~/services/authAPI';
import LoadingState from '~/components/LoadingState/LoadingState';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState(null);
  const { loading, setLoading, setContextError, contextError } = useContext(StoreContext);
  const navigate = useNavigate();
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 'full'
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 'full'
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
  const getEmail = e => {
    setEmail(e.target.value);
  };

  const hanleGetVeriCode = async signupEmail => {
    try {
      setLoading(true);
      setContextError(null);
      if (!signupEmail) {
        return setContextError('Bạn chưa nhập email');
      }
      const sendCode = await authApi.getCode(signupEmail);
      const code = sendCode.data?.message?.code;
      setAuthCode(code);

      // setTimeout(() => {
      //   setAuthCode(null);
      // }, 180000);
    } catch (error) {
      setContextError(error);
    } finally {
      setLoading(false);
    }
  };
  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      setLoading(true);
      setContextError(null);
      const { captcha } = values;
      if (+captcha === +authCode) {
        await validationSchema.signupValidationSchema.validate(values);
        await authApi.signup(values);
        return navigate('/login');
      } else {
        return setContextError('Mã không hợp lệ');
      }
    } catch (error) {
      setContextError(error.message);
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
          {contextError && <div>{contextError} </div>}
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
              <Input value={email} onChange={getEmail} />
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

            <Form.Item label='Mã xác thực' extra=''>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name='captcha'
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập mã xác thực của bạn '
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Col span={40}>
                    <div className='h-3 text-[15px] text-red-500 '> {contextError}</div>
                  </Col>
                </Col>

                <Col span={12}>
                  {loading ? (
                    <LoadingState />
                  ) : (
                    <Button onClick={() => hanleGetVeriCode(email)}>Lấy mã xác thực</Button>
                  )}
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
          <div className='text-center font-bold '>
            Already have an account ?
            <Link to='/login' className='text-blue-500 no-underline font-bold'>
              {' '}
              Login{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

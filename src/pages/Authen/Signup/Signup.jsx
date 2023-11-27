import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select
} from 'antd';
import { validationSchema } from '~/validationSchema/authValidationSchema';
import { Schema } from 'yup';
import { StoreContext } from '~/context/storeContext/StoreContext';

const Signup = () => {
  const { loading, setLoading, error, setError } = useContext(StoreContext);
  const { Option } = Select;
  const residences = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake'
            }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men'
            }
          ]
        }
      ]
    }
  ];
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

  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      setLoading(true);
      setError(null);
      console.log('Received values of form: ', values);
      const validateValues = await validationSchema.signupValidationSchema.validate(values);

      // if (!validateValues) {
      //   throw new Error();
      // }
    } catch (error) {
      setError(error.message);
      console.log(error);
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
  const suffixSelector = (
    <Form.Item name='suffix' noStyle>
      <Select
        style={{
          width: 70
        }}
      >
        <Option value='USD'>$</Option>
        <Option value='CNY'>¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };
  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website
  }));
  return (
    <div className='flex justify-center w-full'>
      <div className='w-8/12 h-screen'>
        <img className='w-full h-full object-cover ' src='./src/assets/loginPoster.jpg' />
      </div>
      <div className='w-4/12 flex justify-center items-center'>
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
            maxWidth: 600
          }}
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
            <Input />
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
            <Input />
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

          {/* <Form.Item
            name='nickname'
            label='Nickname'
            tooltip='What do you want others to call you?'
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true
              }
            ]}
          >
            <Input />
          </Form.Item> */}

          {/* <Form.Item
            name='residence'
            label='Habitual Residence'
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!'
              }
            ]}
          >
            <Cascader options={residences} />
          </Form.Item> */}

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
          {/* <Form.Item
            name='donation'
            label='Donation'
            rules={[
              {
                required: true,
                message: 'Please input donation amount!'
              }
            ]}
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{
                width: '100%'
              }}
            />
          </Form.Item> */}

          {/* <Form.Item
            name='website'
            label='Website'
            rules={[
              {
                required: true,
                message: 'Please input website!'
              }
            ]}
          >
            <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder='website'>
              <Input />
            </AutoComplete>
          </Form.Item> */}

          {/* <Form.Item
            name='intro'
            label='Intro'
            rules={[
              {
                required: true,
                message: 'Please input Intro'
              }
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item> */}

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
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     {' '}
  //     <form onSubmit={handleSubmit} className='space-y-6' action='#' method='POST'>
  //       <div>
  //         <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
  //           Email address
  //         </label>
  //         <div className='mt-2'>
  //           <input
  //             id='email'
  //             name='email'
  //             type='email'
  //             autoComplete='email'
  //             onChange={handleChange}
  //             required
  //             className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <div className='flex items-center justify-between'>
  //           <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
  //             Password
  //           </label>
  //           <div className='text-sm'>
  //             <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
  //               Forgot password?
  //             </a>
  //           </div>
  //         </div>
  //         <div className='mt-2'>
  //           <input
  //             id='password'
  //             name='password'
  //             type='password'
  //             autoComplete='current-password'
  //             onChange={handleChange}
  //             required
  //             className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
  //           />
  //         </div>
  //       </div>

  //       <div>
  //         <button
  //           type='submit'
  //           className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
  //         >
  //           Sign in
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
};

export default Signup;

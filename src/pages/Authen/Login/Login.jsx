import { Button, Checkbox, Form, Input } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoadingState from '~/components/LoadingState/LoadingState';
import { StoreContext } from '~/context/storeContext/StoreContext';
import authApi from '~/services/authAPI';
import { validationSchema } from '~/validationSchema/authValidationSchema';
const Login = () => {
  const { loading, setLoading, setContextError, contextError, navigate } = useContext(StoreContext);

  const onFinish = async values => {
    try {
      setLoading(true);
      setContextError(null);
      await validationSchema.loginValidationSchema.validate(values);
      const response = await authApi.login(values);
      navigate('/');
    } catch (error) {
      setContextError(error);
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form
        name='basic'
        labelCol={{
          span: 30
        }}
        wrapperCol={{
          span: 30
        }}
        style={{
          minWidth: 300
        }}
        layout='vertical'
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Hãy nhập email của bạn!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Mật khẩu'
          name='password'
          rules={[
            {
              required: true,
              message: 'Hãy nhập mật khẩu của bạn!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type='primary' htmlType='submit'>
            {loading ? <LoadingState /> : 'Đăng nhập'}
          </Button>
        </Form.Item>
        <div className='text-center text-sm font-bold '>
          Don&apos;t you have a account ?
          <Link to='/auth/signup' className='text-blue-500 no-underline font-bold'>
            Signup
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;

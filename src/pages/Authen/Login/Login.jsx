import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import { Button, Checkbox, Form, Input } from 'antd';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import LoadingState from '~/components/LoadingState/LoadingState';
import { StoreContext } from '~/context/storeContext/StoreContext';
import { login } from '~/redux/Auth/authSlice';
import authApi from '~/services/authAPI';
import { TOKEN_TYPES } from '~/utils/constants';
import { validationSchema } from '~/validationSchema/authValidationSchema';

const Login = () => {
  const { loading, setLoading, setContextError, contextError, navigate } = useContext(StoreContext);
  const dispatch = useDispatch();
  const onFinish = async values => {
    try {
      setLoading(true);
      setContextError(null);
      await validationSchema.loginValidationSchema.validate(values);
      const response = await authApi.login(values);
      const accessToken = response?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem(TOKEN_TYPES.ACCESS_TOKEN, accessToken);
        const getCurrentUser = await authApi.fetchCurrentUser();
        const currentUser = getCurrentUser?.data;
        const payload = {
          user: currentUser
        };
        dispatch(login(payload));
        navigate('/');
      }
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
        <div className='h-4'>
          {contextError && (
            <div className='text-center text-red-500 text-sm '> {contextError} </div>
          )}
        </div>
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
        <div className='text-center mb-3 text-sm font-bold items-center '>
          Bạn chưa có tài khoản ?
          <Link to='/auth/signup' className='text-blue-500 no-underline font-bold'>
            Đăng ký
          </Link>
        </div>
        <div className='flex items-center justify-center flex-col'>
          <div className='text-sm font-bold mb-3 text-center'> hoặc đăng nhập với </div>
          <div className='mb-3'>
            <GoogleLogin
              onSuccess={async credentialResponse => {
                try {
                  const verifyUser = await authApi.verifyGoogleCount(credentialResponse);
                  const accessToken = verifyUser?.data?.accessToken;
                  if (accessToken) {
                    localStorage.setItem(TOKEN_TYPES.ACCESS_TOKEN, accessToken);
                    const user = await authApi.fetchCurrentUser();
                    const userData = user.data;
                    const payload = {
                      user: userData
                    };
                    dispatch(login(payload));
                    navigate('/');
                  }
                } catch (error) {
                  setContextError(error.message);
                }
              }}
            />
          </div>
          <div className='border rounded	 border-[#e5e7eb] border-solid px-2 '>
            <img
              src='../src/assets/facebook-logo/facebook.png'
              className=' h-6  rounded-full bg-blue-500'
            />
            <FacebookLogin
              appId='1348215319416652'
              style={{
                backgroundColor: 'white',
                color: 'black',
                fontSize: '12px',
                fontWeight: '500',
                padding: '9px 12px',
                border: 'none',
                borderRadius: '4px'
              }}
              onSuccess={async response => {
                console.log('Login Success!', response);
              }}
              onFail={error => {
                console.log('Login Failed!', error);
              }}
              onProfileSuccess={async response => {
                console.log('Get Profile Success!', response);
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};
export default Login;

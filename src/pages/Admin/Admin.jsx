import { Col, Row } from 'antd';

import SimpleHeader from '~/layouts/SimpleHeader';
import AdminDashBoard from './AdminDashBoard/AdminDashBoard';
import AdminSideBar from './AdminSideBar/AdminSideBar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reloadUser } from '~/redux/user/userSlice';

const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reloadUser());
  }, []);
  return (
    <div className='bg-[#f8fafb] min-h-screen w-full '>
      <SimpleHeader />
      <Row gutter={30} className='my-8'>
        <Col className=' relative ' span={4}>
          <AdminSideBar className='' />
        </Col>
        <Col span={20}>
          <AdminDashBoard />
        </Col>
      </Row>
    </div>
  );
};

export default Admin;

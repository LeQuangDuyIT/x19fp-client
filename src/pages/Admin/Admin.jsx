import { Col, Row } from 'antd';

import SimpleHeader from '~/layouts/SimpleHeader';
import AdminDashBoard from './AdminDashBoard/AdminDashBoard';
import AdminSideBar from './AdminSideBar/AdminSideBar';

const Admin = () => {
  return (
    <div className='bg-[#f8fafb] min-h-screen w-full '>
      <SimpleHeader />
      <Row gutter={20} className='my-8'>
        <Col className='text-center bg-white rounded-lg shadow-md' span={4}>
          <AdminSideBar />
        </Col>
        <Col span={20}>
          <AdminDashBoard />
        </Col>
      </Row>
    </div>
  );
};

export default Admin;

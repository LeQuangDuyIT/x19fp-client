import { Row, Col, Divider } from 'antd';
import CountUp from 'react-countup';
import { FaUsers } from 'react-icons/fa6';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { PiExam } from 'react-icons/pi';
import UserTable from './UserTable/UserTable';
import accountAPI from '~/services/userAPI';
import { useEffect } from 'react';
import { useState } from 'react';
import BarChart from '~/components/Chart/BarChart';
import { months } from '~/utils/constants';
const AdminDashBoard = () => {
  const [statics, setStatics] = useState({});
  const [userChartData, setUserChartData] = useState({
    labels: months,
    datasets: [
      {
        label: 'Người dùng',
        data: [100, 44, 78, 12, 45, 23, 56, 21, 67, 88, 32, 11],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }
    ]
  });
  useEffect(() => {
    fetchStaticsNumber();
  }, []);
  const UserChartData = {
    labels: months,
    datasets: [
      {
        label: 'Số lượng tài khoản được tạo qua các tháng',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        backgroundColor: [
          'rgba(135, 235, 15, 0.92)',
          'rgba(125, 220, 35, 0.84)',
          'rgba(115, 205, 55, 0.84)',
          'rgba(105, 190, 75, 0.84)',
          'rgba(95, 175, 95, 0.84)',
          'rgba(85, 160, 115, 0.84)',
          'rgba(75, 145, 135, 0.84)',
          'rgba(65, 130, 155, 0.84)',
          'rgba(55, 115, 175, 0.84)',
          'rgba(45, 100, 195, 0.84)',
          'rgba(35, 85, 215, 0.92)',
          'rgba(25, 70, 220, 0.92)'
        ]
      }
    ]
  };

  const dashBoard = [
    { title: 'NGƯỜI DÙNG', icon: <FaUsers />, quantity: statics.users },
    { title: 'CÂU HỎI/BÀI TẬP', icon: <RiQuestionAnswerLine />, quantity: statics.questions },
    { title: 'ĐỀ THI/BÀI KIỂM TRA', icon: <PiExam />, quantity: statics.tests },
    { title: 'MÔN HỌC/BỘ SƯU TẬP', icon: <PiExam />, quantity: statics.collections }
  ];

  const fetchStaticsNumber = async () => {
    try {
      const getStaticsNumber = await accountAPI.getStaticsNumber();
      const { data } = getStaticsNumber.data;
      setStatics(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row>
        <Col className='px-4' span={24}>
          <div className='text-base text-gray-400 font-semibold'> TỔNG QUAN </div>
          <Divider style={{ borderBottomWidth: '3px' }} />
        </Col>
      </Row>
      <Row className='px-4 mb-7' gutter={20}>
        {dashBoard.map(section => {
          return (
            <Col key={section.title} span={6}>
              <div className=' font-semibold rounded-xl p-3 h-auto shadow-lg shadow-blue-300/40 '>
                <div className=' text-center text-sm text-gray-400 mb-2 '>
                  <span className='mr-3'>{section.icon}</span>
                  <span> {section.title} </span>
                </div>
                <div className='font-semibold text-center text-2xl text-blue-500/80 '>
                  {' '}
                  <CountUp start={0} end={section.quantity} duration={2.5} separator=',' />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <UserTable />
      <Row>
        <Col span={12}>
          <BarChart className='w-full' UserChartData={UserChartData} />
        </Col>
      </Row>
    </>
  );
};

export default AdminDashBoard;

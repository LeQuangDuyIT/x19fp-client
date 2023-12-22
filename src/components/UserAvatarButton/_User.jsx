import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Col, Divider, Modal, Row } from 'antd';
import { FileTextOutlined, LogoutOutlined } from '@ant-design/icons';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { IoGameControllerOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/user/userSlice';
import { LuUserSquare2 } from 'react-icons/lu';
import { FaUserGroup } from 'react-icons/fa6';
import { useState } from 'react';
import StudyGroup from '~/pages/StudyGroup/StudyGroup';
import StudyGroupSearchbar from '~/pages/StudyGroup/StudyGroupSearchbar/StudyGroupSearchbar';
import StudyGroupList from '~/pages/StudyGroup/StudyGroupList/StudyGroupList';
const User = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popStudyGroup, setPopStudyGroup] = useState(false);
  const handleOk = () => {
    setPopStudyGroup(false);
  };
  const handleCancel = () => {
    setPopStudyGroup(false);
  };
  return (
    <div className='flex flex-col gap-y-4 items-start'>
      <Button
        type='text'
        icon={<LuUserSquare2 />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
        onClick={() => {
          navigate('/user-profile');
        }}
      >
        <span className='pr-4'>Hồ sơ người dùng</span>
      </Button>
      <Divider className='bg-slate-100/20 my-0' />

      <Button
        type='text'
        icon={<FaUserGroup />}
        className='w-full text-left text-white/60 font-bold hover:text-white'
        onClick={() => setPopStudyGroup(!popStudyGroup)}
      >
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <span className='pr-4'>Quản lí nhóm học tập</span>
          {popStudyGroup ? (
            <Modal
              title='Quản lí nhóm '
              open={popStudyGroup}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[null]}
              width={1500}
            >
              <div className='flex items-center justify-between'>
                <div className='w-5/12 s  px-3 pt-5 rounded-md shadow-user-profile   '>
                  Danh sách các nhóm
                  <StudyGroupList />{' '}
                </div>
                <div className='w-7/12'>
                  {' '}
                  <StudyGroupSearchbar />
                </div>
              </div>
            </Modal>
          ) : (
            ''
          )}
        </Badge>
      </Button>

      <Button type='text' className='w-full text-left' onClick={() => navigate('/question/mine')}>
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <div className='flex items-center gap-3'>
            <RiQuestionAnswerLine className='text-base' />
            <span className='pr-3'>Kho câu hỏi/bài tập</span>
          </div>
        </Badge>
      </Button>
      <Button type='text' className='w-full text-left' onClick={() => navigate('/test/mine')}>
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <div className='flex items-center gap-3'>
            <FileTextOutlined className='text-base' />
            <span className='pr-3'>Kho đề thi/kiểm tra</span>
          </div>
        </Badge>
      </Button>
      <Button
        type='text'
        className='w-full text-left'
        onClick={() => navigate(`/u/${currentUser?._id}/question`)}
      >
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <div className='flex items-center gap-3'>
            <IoGameControllerOutline className='text-base' />
            <span className='pr-3'>Kho game</span>
          </div>
        </Badge>
      </Button>
      <Divider className='bg-slate-100/20 my-0' />
      <Button type='text' onClick={() => dispatch(logout())}>
        <div className='w-full flex items-center gap-3 text-white/60 font-bold hover:text-white'>
          <LogoutOutlined className='text-base' />
          <span className=''>Đăng xuất</span>
        </div>
      </Button>
    </div>
  );
};

export default User;

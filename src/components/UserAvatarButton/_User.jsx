import { useNavigate } from 'react-router-dom';
import { Badge, Button, Divider, Modal } from 'antd';
import { FileTextOutlined, LogoutOutlined } from '@ant-design/icons';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { IoGameControllerOutline } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa6';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/user/userSlice';
import { LuUserSquare2 } from 'react-icons/lu';
import { FaUserGroup } from 'react-icons/fa6';
import { useState } from 'react';
import StudyGroupSearchbar from '~/pages/StudyGroup/StudyGroupSearchbar/StudyGroupSearchbar';
import StudyGroupList from '~/pages/StudyGroup/StudyGroupList/StudyGroupList';
import StudyGroupCreator from '~/pages/StudyGroup/StudyGroupCreator/StudyGroupCreator';
const User = () => {
  const { currentUser } = useSelector(state => state.user);
  const { data } = useSelector(state => state.group.studyGroup);
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popStudyGroup, setPopStudyGroup] = useState(false);
  const handleOk = () => {
    setPopStudyGroup(false);
  };
  const handleCancel = () => {
    setPopStudyGroup(false);
  };
  const onShowStudyGroup = () => {
    setPopStudyGroup(true);
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
        onClick={() => onShowStudyGroup()}
      >
        <Badge count={5} className='text-white/60 font-bold hover:text-white'>
          <span className='pr-4'>Quản lí nhóm học tập</span>

          <Modal
            title='Quản lí nhóm '
            open={popStudyGroup}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[null]}
            width={1500}
          >
            <div className='flex gap-5 justify-between  items-start min-h-[500px]'>
              <div className='w-5/12  px-3 pt-5 rounded-md shadow-user-profile max-h-[450px] overflow-auto   '>
                <div className='mb-2'>Danh sách các nhóm</div>
                {/* <StudyGroupList /> <StudyGroupList /> <StudyGroupList /> <StudyGroupList />{' '}
                <StudyGroupList /> <StudyGroupList /> <StudyGroupList /> <StudyGroupList />{' '} */}
                {data.map(group => {
                  <StudyGroupList studyGroup={group.studyGroup} />;
                })}
              </div>
              <div className='w-7/12 px-3 pt-5 rounded-md shadow-user-profile min-h-[450px]   '>
                <div className='w-7/12 flex items-center gap-4 mb-4   '>
                  <div className='  '>
                    <StudyGroupCreator className='w-full' />
                  </div>
                </div>
                <div className=' w-full bg-blue-200/30 shadow-user-profile rounded-md  border-2 border-blue-500/40  '>
                  <div className=' flex items-center gap-6 px-3 pt-3 text-sm text-center  mb-2 '>
                    <div className='w-1/3'>
                      <span> Nhóm hiện tại: </span>
                      <span className='font-semibold'> 10A2</span>
                    </div>
                    <div className='w-1/3 '>
                      <span className='mr-1 font-semibold '>10/30</span>

                      <FaUsers className=' align-middle ' />
                    </div>
                    <div className='w-full'>
                      <StudyGroupSearchbar size='small' />
                    </div>
                  </div>
                  <div className='border-b border-gray-300'></div>
                  <div className=' px-3 pt-3'>Học sinh sẽ được thêm</div>
                </div>
              </div>
            </div>
          </Modal>
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

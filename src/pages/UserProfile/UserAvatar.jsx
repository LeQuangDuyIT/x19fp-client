import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { BsFillCameraFill } from 'react-icons/bs';
import { useContext, useState } from 'react';
import { StoreContext } from '~/context/storeContext/StoreContext';
import userAPI from '~/services/userProfileApi';

const UserAvatar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImageForm, setPreviewImageForm] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const { currentUser } = useSelector(state => state.user);
  const { loading, setLoading, contextError, setContextError } = useContext(StoreContext);
  const handleSelectFile = async e => {
    setSelectedFile(e.target.files[0]);
    console.log('e.target.files[0]', e.target.files[0]);
    setPreviewImageForm(!previewImageForm);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const onHandleUploadAvatar = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      setContextError(null);
      const selectedImgage = selectedFile;
      const formData = new FormData();
      formData.append('picture', selectedImgage);
      await userAPI.uploadImage(currentUser._id, formData);
    } catch (error) {
      console.log(error);
      setContextError(error);
    } finally {
      setLoading(false);
    }
  };

  const onHandleCloseForm = () => {
    setPreviewImageForm(!previewImageForm);
    setPreviewImage('');
  };
  return (
    <div className='bg-white w-auto text-center rounded h-[200px] px-14 py-4 shadow-user-profile '>
      <div className='mb-2 relative '>
        {currentUser.picture ? (
          <Avatar
            style={{ boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.2)' }}
            shape='circle'
            size={130}
            src={currentUser.picture}
          />
        ) : (
          <Avatar
            shape='circle'
            style={{ boxShadow: '1px 1px 5px 1px rgba(0,0,0,0.2)' }}
            size={130}
            icon={<UserOutlined />}
          />
        )}
        <label htmlFor='file-upload' className='cursor-pointer'>
          <div className='absolute right-0 bottom-4 border-slate-400 border-2 text-center flex  items-center rounded-full p-2 align-middle content-center bg-gray-200 z-1 hover:bg-gray-300 '>
            <BsFillCameraFill className='text-2xl' />
            <input
              id='file-upload'
              name='file-upload'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleSelectFile}
            />
          </div>
        </label>
      </div>
      <span className='text-center'>
        {currentUser.firstName} {currentUser.lastName}
      </span>
      <form onSubmit={onHandleUploadAvatar} className='w-[400px] h-[700px] p-2 rounded  bg-red-200'>
        <span>Đây có phải là ảnh bạn muốn</span>
        <div className='w-[300px] h-auto m-auto'>
          <img className=' w-full h-auto object-contain' src={previewImage} />
          <button
            type='submit'
            className='w-28 h-10 rounded-lg bg-green-500 mr-[70px] hover:bg-green-600 '
          >
            {' '}
            Xác Nhận{' '}
          </button>
          <button
            type='button'
            onClick={onHandleCloseForm}
            className='w-28 h-10 rounded-lg bg-red-500  hover:bg-red-600'
          >
            {' '}
            Hủy bỏ{' '}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAvatar;

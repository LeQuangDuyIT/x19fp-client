import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useContext } from 'react';
import { StoreContext } from '~/context/storeContext/StoreContext';
import { useSelector } from 'react-redux';
import userAPI from '~/services/userProfileApi';
import { fetchCurrentUser } from '~/redux/user/userAction';
const PreviewImageFormAntd = ({ previewImage, setPreviewImage, selectedFile }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const { contextError, setContextError, dispatch } = useContext(StoreContext);
  const { currentUser } = useSelector(state => state.user);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      setContextError(null);
      const formData = new FormData();
      formData.append('picture', selectedFile);
      await userAPI.uploadImage(currentUser._id, formData);
      dispatch(fetchCurrentUser());
      setPreviewImage('');
    } catch (error) {
    } finally {
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setPreviewImage('');
  };
  return (
    <>
      {/* <Button type='primary' onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      <Modal
        title='Title'
        open={previewImage}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <img className=' w-full h-[300px] object-contain' src={previewImage} />
      </Modal>
    </>
  );
};
export default PreviewImageFormAntd;

import Modal from '@components/Modal';
import React, { useState } from 'react';
import EditForm from './EditForm';

interface IProps {
  inView: boolean;
}

const EditProfileButton: React.FC<IProps> = ({ inView }) => {
  const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
  const handleOpenEditForm = () => setIsOpenEditForm(true);
  const handleCloseEditForm = () => setIsOpenEditForm(false);
  if (!inView) return null;
  return (
    <>
      <button
        type='button'
        onClick={handleOpenEditForm}
        className='rounded-sm bg-blue-400 px-4 py-2 text-sm font-semibold text-white hover:brightness-110 active:brightness-90'
      >
        Edit Profile
      </button>
      <Modal inView={isOpenEditForm} handler={handleCloseEditForm}>
        <EditForm handleCloseEditForm={handleCloseEditForm} />
      </Modal>
    </>
  );
};

export default EditProfileButton;

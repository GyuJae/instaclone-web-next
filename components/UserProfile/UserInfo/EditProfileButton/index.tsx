import React from 'react';

interface IProps {
  inView: boolean;
}

const EditProfileButton: React.FC<IProps> = ({ inView }) => {
  if (!inView) return null;
  return (
    <button
      type='button'
      className='rounded-sm bg-blue-400 px-4 py-2 text-sm font-semibold text-white hover:brightness-110 active:brightness-90'
    >
      Edit Profile
    </button>
  );
};

export default EditProfileButton;

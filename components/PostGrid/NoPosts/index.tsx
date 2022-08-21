import React from 'react';
import CameraIcon from '@assets/svgs/camera.svg';
const NoPosts = () => {
  return (
    <div className='col-span-3 flex h-72 w-full flex-col items-center justify-center py-10'>
      <div className='h-10 w-10 fill-gray-400'>
        <CameraIcon />
      </div>
      <span className='text-sm font-semibold text-gray-400'>No Photos</span>
    </div>
  );
};

export default NoPosts;

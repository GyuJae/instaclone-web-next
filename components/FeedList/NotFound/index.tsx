import React from 'react';
import InstaLogo from '@assets/svgs/instagram.svg';
const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-4 py-10'>
      <div className='h-12 w-12 fill-gray-400'>
        <InstaLogo />
      </div>
      <span className='font-semibold text-gray-400'>No Feed</span>
    </div>
  );
};

export default NotFound;

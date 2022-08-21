import React from 'react';
import AirPlaneIcon from '@assets/svgs/paper-plane.svg';

const Message = () => {
  return (
    <button type='button'>
      <div className='h-4 w-4'>
        <AirPlaneIcon />
      </div>
    </button>
  );
};

export default Message;

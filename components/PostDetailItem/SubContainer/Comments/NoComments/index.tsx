import React from 'react';
import CommentSlash from '@assets/svgs/comment-slash.svg';

const NoComments = () => {
  return (
    <div className='flex h-[440px] flex-col items-center justify-center space-y-1'>
      <div className='w-12 fill-gray-400'>
        <CommentSlash />
      </div>
      <span className='font-semibold text-gray-400'>No Comments</span>
    </div>
  );
};

export default NoComments;

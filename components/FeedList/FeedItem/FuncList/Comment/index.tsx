import React from 'react';
import CommentIcon from '@assets/svgs/comment.svg';

const Comment = () => {
  return (
    <button type='button'>
      <div className='h-5 w-5'>
        <CommentIcon />
      </div>
    </button>
  )
}

export default Comment
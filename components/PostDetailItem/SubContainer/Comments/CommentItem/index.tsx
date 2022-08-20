import { ISeeCommentsComment } from '@apollo/queries/seeComments.query'
import Avatar from '@components/Avatar';
import React from 'react'
import DeleteButton from './DeleteButton';

interface IProps {
  comment: ISeeCommentsComment;
}

const CommentItem: React.FC<IProps> = ({ comment }) => { 
  return (
    <div className='flex space-x-2'>
      <Avatar avatar={comment.user.avatar} />
      <div className='flex w-full justify-between'>
        <div className='space-x-1'>
          <span className='text-sm font-semibold'>{comment.user.username}</span>
          <span className='text-sm'>{comment.payload}</span>
        </div>
        <DeleteButton commentId={comment.id} inView={comment.isMine} />
      </div>
    </div>
  )
}

export default CommentItem
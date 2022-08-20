import CommentForm from '@components/CommentForm';
import React from 'react'
import Comments from './Comments';

interface IProps {
  postId: number;
}

const SubContainer: React.FC<IProps> = ({postId}) => {
  return (
    <div className='w-[500px]'>
      <Comments postId={postId} />
      <CommentForm postId={postId}/>
    </div>
  )
}

export default SubContainer
import React from 'react'
import Comment from './Comment'
import Liked from './Liked'
import Message from './Message'

interface IProps {
  postId: number;
  isLiked: boolean;
}

const FuncList: React.FC<IProps> = ({postId, isLiked}) => {
  return (
    <div className='space-x-3 px-2 pb-0 pt-2'>
      <Liked isLiked={isLiked} postId={postId} />
      <Comment />
      <Message />
    </div>
  )
}

export default FuncList
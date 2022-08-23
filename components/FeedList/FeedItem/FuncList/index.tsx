import React from 'react';
import Comment from './Comment';
import Liked from './Liked';
import Message from './Message';

interface IProps {
  postId: number;
  isLiked: boolean;
  userId: number;
}

const FuncList: React.FC<IProps> = ({ postId, isLiked, userId }) => {
  return (
    <div className='flex space-x-3 px-2 pb-0 pt-2'>
      <Liked isLiked={isLiked} postId={postId} />
      <Comment postId={postId} />
      <Message userId={userId} />
    </div>
  );
};

export default FuncList;

import React from 'react';
import Comment from './Comment';
import Liked from './Liked';

interface IProps {
  postId: number;
  isLiked: boolean;
}

const FuncList: React.FC<IProps> = ({ postId, isLiked }) => {
  return (
    <div className='flex space-x-3 px-2 pb-0 pt-2'>
      <Liked isLiked={isLiked} postId={postId} />
      <Comment postId={postId} />
    </div>
  );
};

export default FuncList;

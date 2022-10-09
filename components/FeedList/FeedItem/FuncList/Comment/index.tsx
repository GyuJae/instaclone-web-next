import React from 'react';
import CommentIcon from '@assets/svgs/comment.svg';
import Link from 'next/link';

interface IProps {
  postId: number;
}

const Comment: React.FC<IProps> = ({ postId }) => {
  return (
    <Link
      href={{
        pathname: '/',
        query: {
          p: postId,
        },
      }}
      scroll={false}
    >
      <a aria-label='open comments'>
        <div className='h-5 w-5'>
          <CommentIcon />
        </div>
      </a>
    </Link>
  );
};

export default Comment;

import Link from 'next/link';
import React from 'react'

interface IProps {
  commentCount: number;
  postId: number;
}

const CommentCount: React.FC<IProps> = ({commentCount, postId}) => {
  return (
    <Link href={`/${postId}`}>
      <a className='px-2 text-gray-500'>     
        See all {commentCount} comments
      </a>
    </Link>
  )
}

export default CommentCount
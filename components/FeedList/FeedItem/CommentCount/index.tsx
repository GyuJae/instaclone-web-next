import Link from 'next/link';
import React from 'react'

interface IProps {
  commentCount: number;
  postId: number;
}

const CommentCount: React.FC<IProps> = ({commentCount, postId}) => {
  return (
    <Link href={`/?p=${postId}`} scroll={false}>
      <a className='px-2 text-sm text-gray-500'>     
        See all {commentCount} comments
      </a>
    </Link>
  )
}

export default CommentCount
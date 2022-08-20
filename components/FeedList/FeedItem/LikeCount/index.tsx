import React from 'react'

interface IProps {
  likeCount: number;
  commentCount: number;
}

const LikesCount: React.FC<IProps> = ({likeCount}) => {
  return (
    <div className='px-2'>
      <span className="text-sm font-semibold">{likeCount} likes</span>
    </div>
  )
}

export default LikesCount
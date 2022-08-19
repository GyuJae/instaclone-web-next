import React from 'react'

interface IProps {
  likeCount: number;
  commentCount: number;
}

const Count: React.FC<IProps> = ({likeCount}) => {
  return (
    <div className='px-2'>
      <span className="text-sm font-semibold">{likeCount} likes</span>
    </div>
  )
}

export default Count
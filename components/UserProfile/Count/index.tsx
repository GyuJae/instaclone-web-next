import React from 'react'

interface IProps {
  totalFollowing: number;
  totalFollower: number;
}

const Count:React.FC<IProps> = ({totalFollower, totalFollowing}) => {
  return (
    <div className='space-x-4 text-xs'>
      <span>{totalFollowing} <strong>Followings</strong></span>
      <span>{totalFollower} <strong>Followers</strong></span>
    </div>
  )
}

export default Count
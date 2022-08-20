import { ISeeFeedUser } from '@apollo/queries/seeFeed.query'
import Avatar from '@components/Avatar'
import Link from 'next/link'
import React from 'react'

interface IProps {
  user: ISeeFeedUser
}

const FeedHeader:React.FC<IProps> = ({user}) => {
  return (
    <div className='flex px-2 pb-2'>
      <Link href={`/profile/${user.username}`}>
        <a className='flex items-center space-x-2'>
          <Avatar avatar={user.avatar} />
          <span className='text-sm font-semibold'>{user.username}</span>
        </a>       
      </Link>
    </div>
  )
}

export default FeedHeader
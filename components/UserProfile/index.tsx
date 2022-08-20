import { useSeeProfile } from '@apollo/queries/seeProfile.query';
import Avatar from '@components/Avatar';
import React from 'react'
import UserInfo from './UserInfo';

interface IProps {
  username: string;
}

const UserProfile:React.FC<IProps> = ({username}) => {
  const {user} = useSeeProfile(username);
  
  if (!user) return null;
  return (
    <div className='flex space-x-12 px-2'>
      <Avatar avatar={user.avatar} size="L" />
      <div className='py-2'>
        <UserInfo userId={user.id} username={username} isFollowing={user.isFollowing} isMe={user.isMe} />
      </div>
    </div>
  )
}

export default UserProfile
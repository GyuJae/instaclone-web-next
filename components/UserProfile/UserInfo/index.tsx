import React from 'react';
import EditProfileButton from './EditProfileButton';
import FollowingButton from './FollowingButton';
import Logout from './Logout';

interface IProps {
  userId: number;
  username: string;
  isFollowing: boolean;
  isMe: boolean;
}

const UserInfo: React.FC<IProps> = ({ userId, username, isFollowing, isMe }) => {
  return (
    <div className='flex items-center space-x-5'>
      <span className='text-2xl'>{username}</span>
      <div className='flex space-x-2'>
        <EditProfileButton inView={isMe} />
        <Logout inView={isMe} />
      </div>
      <FollowingButton inView={!isMe} isFollowing={isFollowing} userId={userId} />
    </div>
  );
};

export default UserInfo;

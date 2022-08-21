import Avatar from '@components/Avatar';
import FollowingButton from '@components/UserProfile/UserInfo/FollowingButton';
import Link from 'next/link';
import React from 'react';

interface IProps {
  user: {
    id: number;
    username: string;
    avatar: string | null;
    isMe: boolean;
    isFollowing: boolean;
  };
}

const UserRow: React.FC<IProps> = ({ user }) => {
  if (user.isMe) return null;
  return (
    <div className='flex w-full items-center justify-between py-1 px-2 hover:bg-gray-300'>
      <Link href={`/profile/${user.username}`}>
        <a>
          <div className='flex items-center space-x-2'>
            <Avatar avatar={user.avatar} />
            <span className='text-sm font-semibold'>{user.username}</span>
          </div>
        </a>
      </Link>
      <FollowingButton inView={!user.isMe} isFollowing={user.isFollowing} userId={user.id} />
    </div>
  );
};

export default UserRow;

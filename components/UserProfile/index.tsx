import { useCacheSeePostsByUsername } from '@apollo/queries/seePostsByUsername.query';
import { useSeeProfile } from '@apollo/queries/seeProfile.query';
import Avatar from '@components/Avatar';
import PostGrid from '@components/PostGrid';
import React from 'react';
import Count from './Count';
import UserInfo from './UserInfo';

interface IProps {
  username: string;
}

const UserProfile: React.FC<IProps> = ({ username }) => {
  const { user } = useSeeProfile(username);
  const { posts } = useCacheSeePostsByUsername(username);
  if (!user) return null;
  return (
    <div>
      <div className='flex space-x-12 border-b-[1.5px] px-2 pt-4 pb-8'>
        <Avatar avatar={user.avatar} size='L' />
        <div className='space-y-4 py-2'>
          <UserInfo userId={user.id} username={username} isFollowing={user.isFollowing} isMe={user.isMe} />
          <Count totalFollower={user.totalFollower} totalFollowing={user.totalFollowing} />
        </div>
      </div>
      <PostGrid files={posts?.map((post) => post.files[0])} username={username} />
    </div>
  );
};

export default UserProfile;

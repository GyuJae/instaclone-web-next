import { useSeeFriends } from '@apollo/queries/seeFriends.query';
import UserRow from '@components/UserRow';
import React, { useMemo } from 'react';

const Friends = () => {
  const { users } = useSeeFriends();
  const friendList = useMemo(() => {
    if (!users) return null;
    return users.map((user) => {
      const key = `friend-${user.id}`;
      return <UserRow key={key} user={user} />;
    });
  }, [users]);

  return <div className='w-64 py-2'>{friendList}</div>;
};

export default Friends;

import { useToggleFollow } from '@apollo/mutations/toggleFollow.mutation';
import { cls } from '@libs/index';
import React from 'react';

interface IProps {
  inView: boolean;
  isFollowing: boolean;
  userId: number;
}

const FollowingButton: React.FC<IProps> = ({ inView, isFollowing, userId }) => {
  const { toggleFollowMutate, loading } = useToggleFollow(userId, isFollowing);

  const handleClickToggleFollow = () => {
    if (loading) return;
    toggleFollowMutate();
  };

  const buttonPayload = isFollowing ? 'UnFollow' : 'Follow';

  if (!inView) return null;
  return (
    <button
      name='toggleFollow'
      type='button'
      onClick={handleClickToggleFollow}
      className={cls(
        'rounded-sm px-3 py-2 text-xs hover:brightness-110 active:brightness-90 font-semibold',
        isFollowing ? 'border-[1px] border-black' : 'bg-blue-400 text-white'
      )}
    >
      {buttonPayload}
    </button>
  );
};

export default FollowingButton;

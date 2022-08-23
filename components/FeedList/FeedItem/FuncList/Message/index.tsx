import React from 'react';
import AirPlaneIcon from '@assets/svgs/paper-plane.svg';
import { useCreateMessageRoom } from '@apollo/mutations/createMessageRoom.mutation';
import { useRouter } from 'next/router';
import { useCacheMe } from '@apollo/queries/me.query';

interface IProps {
  userId: number;
}

const Message: React.FC<IProps> = ({ userId }) => {
  const { user } = useCacheMe();
  const router = useRouter();
  const { createMessageRoomMutatione, loading } = useCreateMessageRoom();

  const handleCreateMessageRoom = () => {
    if (loading) return;
    createMessageRoomMutatione({
      variables: {
        input: {
          userId,
        },
      },
      onCompleted: ({ createMessageRoom: { ok, roomId } }) => {
        if (ok && roomId) {
          router.push(
            {
              pathname: router.pathname,
              query: {
                mr: roomId,
              },
            },
            undefined,
            { scroll: false }
          );
        }
      },
    });
  };

  if (!user || user.id === userId) return null;
  return (
    <button type='button' onClick={handleCreateMessageRoom}>
      <div className='h-4 w-4'>
        <AirPlaneIcon />
      </div>
    </button>
  );
};

export default Message;

import { gql, useSubscription } from '@apollo/client';
import { MESSAGE_FRAGMENT } from '@apollo/fragments/message.fragment';

export const useRoomUpdatesSubscription = (roomId: number) => {
  const { data, loading } = useSubscription<IRoomUpdates, IRoomUpdatesVariables>(ROOM_UPDATES_SUBSCRIPTION, {
    variables: {
      input: {
        roomId,
      },
    },
  });

  return {
    data,
    loading,
  };
};

export const ROOM_UPDATES_SUBSCRIPTION = gql`
  subscription RoomUpdates($input: IRoomUpdatesInput!) {
    roomUpdates(input: $input) {
      ...MessageFragment
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export interface IRoomUpdatesUser {
  id: number;
  username: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface IRoomUpdatesOutput {
  id: number;
  createdAt: string;
  payload: string;
  read: boolean;
  user: IRoomUpdatesUser;
}

export interface IRoomUpdates {
  roomUpdates: IRoomUpdates;
}

export interface IRoomUpdatesInput {
  roomId: number;
}

export interface IRoomUpdatesVariables {
  input: IRoomUpdatesInput;
}

import { gql, useQuery } from '@apollo/client';
import { MESSAGE_FRAGMENT } from '@apollo/fragments/message.fragment';

export const useSeeRoom = (roomId: number) => {
  const { data, loading } = useQuery<ISeeRoom, ISeeRoomVariables>(SEE_ROOM_QUERY, {
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

export const SEE_ROOM_QUERY = gql`
  query SeeRoom($input: ISeeRoomInput!) {
    seeRoom(input: $input) {
      ok
      room {
        id
        unreadTotal
        messages {
          ...MessageFragment
        }
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export interface ISeeRoomRoomMessageUser {
  id: number;
  username: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface ISeeRoomRoomMessage {
  id: number;
  createdAt: string;
  payload: string;
  read: boolean;
  user: ISeeRoomRoomMessageUser;
}

export interface ISeeRoomRoom {
  id: number;
  unreadTotal: number;
  messages: ISeeRoomRoomMessage[];
}

export interface ISeeRoomOutput {
  ok: boolean;
  room: ISeeRoomRoom;
}

export interface ISeeRoom {
  seeProfile: ISeeRoomOutput;
}

export interface ISeeRoomInput {
  roomId: number;
}

export interface ISeeRoomVariables {
  input: ISeeRoomInput;
}

import { gql, useMutation } from '@apollo/client';

export const useCreateMessageRoom = () => {
  const [createMessageRoomMutatione, { loading }] = useMutation<
    ICreateMessageRoomMutation,
    ICreateMessageRoomVariables
  >(CREATE_MESSAGE_ROOM_MUTATION);

  return {
    createMessageRoomMutatione,
    loading,
  };
};

export const CREATE_MESSAGE_ROOM_MUTATION = gql`
  mutation CreateMessageRoom($input: ICreateMessageRoomInput!) {
    createMessageRoom(input: $input) {
      ok
      roomId
    }
  }
`;

export interface ICreateMessageRoomOutput {
  ok: boolean;
  roomId: number | null;
}

export interface ICreateMessageRoomMutation {
  createMessageRoom: ICreateMessageRoomOutput;
}

export interface ICreateMessageRoomInput {
  userId: number;
}

export interface ICreateMessageRoomVariables {
  input: ICreateMessageRoomInput;
}

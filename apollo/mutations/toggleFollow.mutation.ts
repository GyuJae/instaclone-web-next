import {gql, useMutation} from '@apollo/client';

export const useToggleFollow = (userId: number, isFollowing: boolean) => {
  const [toggleFollowMutate, {loading}] = useMutation<
    IToggleFollowMutation,
    IToggleFollowVariables
  >(TOGGLE_FOLLOW_MUTAION, {
    variables: {
      input: {
        userId,
      },
    },
    update: (cache, {data}, {variables}) => {
      if (data && data.toggleFollow.ok && variables) {
        const USER_ID = `UserEntity:${variables.input.userId}`;
        cache.modify({
          id: USER_ID,
          fields: {
            isFollowing(prev) {
              return !prev;
            },
            totalFollower(prev) {
              if (isFollowing) {
                return prev - 1;
              }
              return prev + 1;
            }
          },
        });
      }
    },
  });

  return {
    toggleFollowMutate,
    loading,
  };
};

export const TOGGLE_FOLLOW_MUTAION = gql`
  mutation ToggleFollow($input: IToggleFollowInput!) {
    toggleFollow(input: $input) {
      ok
      error
    }
  }
`;

export interface IToggleFollowOutput {
  ok: boolean;
  error: string | null;
}

export interface IToggleFollowMutation {
  toggleFollow: IToggleFollowOutput;
}

export interface IToggleFollowInput {
  userId: number;
}

export interface IToggleFollowVariables {
  input: IToggleFollowInput;
}
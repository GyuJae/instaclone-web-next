import { gql, useMutation } from '@apollo/client';

export const useToggleLike = (postId: number, isLiked: boolean) => {
  const [toggleLikeMutate, { loading, error }] = useMutation<IToggleLikeMutation, IToggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        input: {
          postId,
        },
      },
      update: (cache, { data }) => {
        if (data?.toggleLike.ok) {
          const POST_ID = `PostEntity:${postId}`;
          cache.modify({
            id: POST_ID,
            fields: {
              isLiked(prev) {
                return !prev;
              },
              likeCount(prev) {
                if (isLiked) {
                  return prev - 1;
                }
                return prev + 1;
              },
            },
          });
        }
      },
    }
  );

  return {
    toggleLikeMutate,
    loading,
    error,
  };
};

export const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLike($input: IToggleLikeInput!) {
    toggleLike(input: $input) {
      ok
      error
    }
  }
`;

export interface IToggleLikeOutput {
  ok: boolean;
  error: string | null;
}

export interface IToggleLikeMutation {
  toggleLike: IToggleLikeOutput;
}

export interface IToggleLikeInput {
  postId: number;
}

export interface IToggleLikeVariables {
  input: IToggleLikeInput;
}

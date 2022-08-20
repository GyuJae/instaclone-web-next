import {gql, useMutation} from '@apollo/client';

export const useCreateComment = () => {
  const [createCommentMutate, {loading}] = useMutation<
    ICreateCommentMutation,
    ICreateCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    update: (cache, {data}, {variables}) => {
      if (data && data.createComment.ok && variables) {
        const POST_ID = variables.input.postId;
        cache.modify({
          id: `PostEntity:${POST_ID}`,
          fields: {
            commentCount(prev) {
              return prev + 1;
            },
          },
        });
      }
    },
  });

  return {
    createCommentMutate,
    loading,
  };
};

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($input: ICreateCommentInput!) {
    createComment(input: $input) {
      ok
      commentId
    }
  }
`;

export interface ICreateCommentOutput {
  ok: boolean;
  commentId: number | null;
}

export interface ICreateCommentMutation {
  createComment: ICreateCommentOutput;
}

export interface ICreateCommentInput {
  postId: number;
  payload: string;
}

export interface ICreateCommentVariables {
  input: ICreateCommentInput;
}
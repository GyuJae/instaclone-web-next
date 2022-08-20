import {gql, useMutation} from '@apollo/client';
import { useMe } from '@apollo/queries/me.query';
import { ISeeComments, ISeeCommentsVariables, SEE_COMMENTS_QUERY } from '@apollo/queries/seeComments.query';

export const useCreateComment = () => {
  const { user } = useMe()
  const [createCommentMutate, {loading, client}] = useMutation<
    ICreateCommentMutation,
    ICreateCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    update: (cache, {data}, {variables}) => {
      if (data && data.createComment.ok && data.createComment.commentId && variables && user) {
        const POST_ID = variables.input.postId;
        cache.modify({
          id: `PostEntity:${POST_ID}`,
          fields: {
            commentCount(prev) {
              return prev + 1;
            },
          },
        });
        const newComment = {
          __typename: `CommentEntity`,
          id: data.createComment.commentId,
          createdAt: Date.now() + "",
          isMine: true,
          payload: variables.input.payload,
          user: {
            ...user!,
            isMe: true
          },
        };
        cache.writeFragment({
          data: newComment,
          fragment: gql`
            fragment BSName on CommentEntity {
              id
              createdAt
              isMine
              payload
              user {
                id
                username
                avatar
              }
            }
          `,
        });
        const seeCommentsData = client.readQuery<ISeeComments, ISeeCommentsVariables>({
          query: SEE_COMMENTS_QUERY, variables: {
            input: {
              postId: variables.input.postId,
              offset: 0
            }
        }});
        if (seeCommentsData && seeCommentsData.seeComments) {
          cache.writeQuery<ISeeComments, ISeeCommentsVariables>({
            query: SEE_COMMENTS_QUERY,
            data: {
              seeComments: {
                ...seeCommentsData.seeComments,
                comments: [...seeCommentsData.seeComments.comments, newComment]
              }
            },
            variables: {
              input: {
                offset: 0,
                postId: variables.input.postId
              }
            }
          })
        }
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
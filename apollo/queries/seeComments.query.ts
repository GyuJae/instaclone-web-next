import { gql, useQuery } from '@apollo/client';
import { COMMENT_FRAMENT } from '../fragments/comment.fragment';

export const useSeeComments = (postId: number, offset?: number) => {
  const { data, loading, refetch, fetchMore, error } = useQuery<ISeeComments, ISeeCommentsVariables>(
    SEE_COMMENTS_QUERY,
    {
      variables: {
        input: {
          postId,
          offset: offset || 0,
        },
      },
    }
  );

  return {
    comments: data?.seeComments.comments,
    loading,
    refetch,
    fetchMore,
    error,
  };
};

export const SEE_COMMENTS_QUERY = gql`
  query SeeComments($input: ISeeCommentsInput!) {
    seeComments(input: $input) {
      comments {
        ...CommentFragment
      }
    }
  }
  ${COMMENT_FRAMENT}
`;

export interface ISeeCommentsComment {
  id: number;
  payload: string;
  createdAt: string;
  isMine: boolean;
  user: {
    id: number;
    username: string;
    avatar: string | null;
    isMe: boolean;
  };
}

export interface ISeeCommentsOutput {
  ok: boolean;
  hasNextPage: boolean;
  comments: ISeeCommentsComment[];
}

export interface ISeeComments {
  seeComments: ISeeCommentsOutput;
}

export interface ISeeCommentsInput {
  postId: number;
  offset: number;
}

export interface ISeeCommentsVariables {
  input: ISeeCommentsInput;
}

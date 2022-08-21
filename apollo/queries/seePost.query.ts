import { gql, useQuery } from '@apollo/client';
import { POST_FEED_FRAGMENT } from '../fragments/post.fragment';
import { USER_FEED_FRAGMENT } from '../fragments/user.fragment';

export const useSeePost = (postId: number) => {
  const { data, loading, refetch, error } = useQuery<ISeePost, ISeePostVariables>(SEE_POST_QUERY, {
    variables: {
      input: {
        postId,
      },
    },
  });

  return {
    post: data?.seePost.post,
    loading,
    refetch,
    error,
  };
};

export const SEE_POST_QUERY = gql`
  query SeePost($input: ISeePostInput!) {
    seePost(input: $input) {
      post {
        ...PostFeedFragment
        user {
          ...UserFeedFragment
        }
      }
    }
  }
  ${POST_FEED_FRAGMENT}
  ${USER_FEED_FRAGMENT}
`;

export interface ISeePostUser {
  id: number;
  username: string;
  avatar: string | null;
  isMe: boolean;
}

export interface ISeePostFile {
  id: number;
  posterPath: string;
}

export interface ISeePostPost {
  id: number;
  caption: string;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  files: ISeePostFile[];
  user: ISeePostUser;
}

export interface ISeePostOutput {
  ok: boolean;
  post: ISeePostPost;
}

export interface ISeePost {
  seePost: ISeePostOutput;
}

export interface ISeePostInput {
  postId: number;
}

export interface ISeePostVariables {
  input: ISeePostInput;
}

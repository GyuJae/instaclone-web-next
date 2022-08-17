import {gql, useQuery} from '@apollo/client';
import {POST_FEED_FRAGMENT} from '../fragments/post.fragment';
import {USER_FEED_FRAGMENT} from '../fragments/user.fragment';

export const useSeeFeed = (offset?: number) => {
  const {data, loading, refetch, fetchMore, error} = useQuery<ISeeFeed,ISeeFeedVariables>(SEE_FEED_QUERY, {
    variables: {
      input: {
        offset: offset || 0,
      },
    },
  });

  return {
    posts: data?.seeFeed.posts,
    loading,
    refetch,
    fetchMore,
    error,
    hasNextPage: !!data?.seeFeed.hasNextPage
  };
};

export const SEE_FEED_QUERY = gql`
  query SeeFeed($input: ISeeFeedInput!) {
    seeFeed(input: $input) {
      hasNextPage
      posts {
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

export interface ISeeFeedPost {
  id: number;
  caption: string;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  files: {
    id: number;
    posterPath: string;
  }[];
  user: {
    id: number;
    username: string;
    avatar: string | null;
    isMe: boolean;
  };
}

export interface ISeeFeedOutput {
  ok: boolean;
  error: string | null;
  hasNextPage: boolean;
  posts: ISeeFeedPost[];
}

export interface ISeeFeed {
  seeFeed: ISeeFeedOutput;
}

export interface ISeeFeedInput {
  offset: number | null;
}

export interface ISeeFeedVariables {
  input: ISeeFeedInput;
}
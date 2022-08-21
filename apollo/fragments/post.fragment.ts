import { gql } from '@apollo/client';

export const POST_FEED_FRAGMENT = gql`
  fragment PostFeedFragment on PostEntity {
    id
    caption
    isLiked
    likeCount
    commentCount
    files {
      id
      posterPath
    }
  }
`;

export const POST_GRID_FRAGMENT = gql`
  fragment PostGridFragment on PostEntity {
    id
    files {
      id
      posterPath
      postId
    }
  }
`;

import {gql} from '@apollo/client';

export const USER_FEED_FRAGMENT = gql`
  fragment UserFeedFragment on UserEntity {
    id
    username
    avatar
    isMe
  }
`;

export const USER_FRAGEMENT = gql`
  fragment UserFragment on UserEntity {
    id
    username
    avatar
    isFollowing
    isMe
  }
`;

export const USER_ME_FRAGMENT = gql`
  fragment UserMeFragment on UserEntity {
    id
    avatar
    username
  }
`;

export const USER_PROFILE_FRAGEMENT = gql`
  fragment UserProfileFragment on UserEntity {
    id
    avatar
    username
    isFollowing
    isMe
    totalFollower
    totalFollowing
  }
`
import {gql} from '@apollo/client';

export const COMMENT_FRAMENT = gql`
  fragment CommentFragment on CommentEntity {
    id
    payload
    createdAt
    isMine
    user {
      id
      username
      isMe
      avatar
    }
  }
`;
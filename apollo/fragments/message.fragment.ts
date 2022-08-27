import { gql } from '@apollo/client';
import { USER_FRAGEMENT } from './user.fragment';

export const MESSAGE_FRAGMENT = gql`
  fragment MessageFragment on MessageEntity {
    id
    createdAt
    payload
    read
    user {
      ...UserFragment
    }
  }
  ${USER_FRAGEMENT}
`;

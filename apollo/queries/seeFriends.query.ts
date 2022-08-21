import { gql, useApolloClient, useQuery } from '@apollo/client';
import { USER_FRAGEMENT } from '../fragments/user.fragment';

export const useCacheSeeFriends = () => {
  const apolloClient = useApolloClient();
  const data = apolloClient.readQuery<ISeeFriends, ISeeFriendsVariables>({
    query: SEE_FRIENDS_QUERY,
    variables: {
      input: {
        offset: 0,
      },
    },
  });

  return {
    users: data?.seeFriends.users,
  };
};

export const useSeeFriends = (offset?: number) => {
  const { data, loading, refetch, error } = useQuery<ISeeFriends, ISeeFriendsVariables>(SEE_FRIENDS_QUERY, {
    variables: {
      input: {
        offset: offset || 0,
      },
    },
  });

  return {
    users: data?.seeFriends.users,
    loading,
    refetch,
    error,
  };
};

export const SEE_FRIENDS_QUERY = gql`
  query SeeFriends($input: ISeeFriendsInput!) {
    seeFriends(input: $input) {
      ok
      users {
        ...UserFragment
      }
    }
  }
  ${USER_FRAGEMENT}
`;

export interface ISeeFriendsUser {
  id: number;
  username: string;
  avatar: string | null;
  isMe: boolean;
  isFollowing: boolean;
}

export interface ISeeFriendsOutput {
  ok: boolean;
  users: ISeeFriendsUser[];
}

export interface ISeeFriends {
  seeFriends: ISeeFriendsOutput;
}

export interface ISeeFriendsInput {
  offset: number | null;
}

export interface ISeeFriendsVariables {
  input: ISeeFriendsInput;
}

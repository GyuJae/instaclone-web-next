import {gql, useApolloClient, useQuery} from '@apollo/client';
import { USER_PROFILE_FRAGEMENT } from '@apollo/fragments/user.fragment';

export const useCacheSeeProfile = (username: string) => {
  const client = useApolloClient()
  const data = client.readQuery<ISeeProfile, ISeeProfileVariables>({
    query: SEE_PROFILE_QUERY,
    variables: {
      input: {
        username
      }
    }
  })
  return {
    user: data?.seeProfile.user,
  }
}

export const useSeeProfile = (username: string) => {
  const {data, loading, refetch, error} = useQuery<ISeeProfile,ISeeProfileVariables>(SEE_PROFILE_QUERY, {
    variables: {
      input: {
        username,
      },
    },
  });

  return {
    user: data?.seeProfile.user,
    loading,
    refetch,
    error,
  };
};

export const SEE_PROFILE_QUERY = gql`
  query SeeProfile($input: ISeeProfileInput!) {
    seeProfile(input: $input) {
      ok
      user {
        ...UserProfileFragment
      }
    }
  }
  ${USER_PROFILE_FRAGEMENT}
`;

export interface ISeeProfileUser {
  id: number;
  avatar: string | null;
  username: string;
  isFollowing: boolean;
  isMe: boolean;
  totalFollower: number;
  totalFollowing: number;
}

export interface ISeeProfileOutput {
  ok: boolean;
  user: ISeeProfileUser;
}

export interface ISeeProfile {
  seeProfile: ISeeProfileOutput;
}

export interface ISeeProfileInput {
  username: string;
}

export interface ISeeProfileVariables {
  input: ISeeProfileInput;
}
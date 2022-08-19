import {gql, useQuery} from '@apollo/client';
import {USER_ME_FRAGMENT} from '../fragments/user.fragment';

export const useMe = () => {
  const {data, loading} = useQuery<IMe>(ME_QUERY);

  return {
    user: data?.me.user,
    loading,
  };
};

export const ME_QUERY = gql`
  query Me {
    me {
      user {
        ...UserMeFragment
      }
    }
  }
  ${USER_ME_FRAGMENT}
`;

interface IMe {
  me: {
    user: {
      id: number;
      avatar: string | null;
      username: string;
    };
  };
}
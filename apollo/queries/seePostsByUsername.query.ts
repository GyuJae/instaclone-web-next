import { gql, useApolloClient, useQuery } from '@apollo/client';
import { POST_GRID_FRAGMENT } from '@apollo/fragments/post.fragment';

export const useCacheSeePostsByUsername = (username: string) => {
  const client = useApolloClient();
  const data = client.readQuery<ISeePostsByUsername, ISeePostsByUsernameVariables>({
    query: SEE_POSTS_BY_USERNAME_QUERY,
    variables: {
      input: {
        username,
      },
    },
  });
  return {
    posts: data?.seePostsByUsername.posts,
  };
};

export const useSeePostsByUsername = (username: string) => {
  const { data, loading, refetch, error } = useQuery<ISeePostsByUsername, ISeePostsByUsernameVariables>(
    SEE_POSTS_BY_USERNAME_QUERY,
    {
      variables: {
        input: {
          username,
        },
      },
    }
  );

  return {
    posts: data?.seePostsByUsername.posts,
    loading,
    refetch,
    error,
  };
};

export const SEE_POSTS_BY_USERNAME_QUERY = gql`
  query SeePostsByUsername($input: ISeePostsByUsernameInput!) {
    seePostsByUsername(input: $input) {
      ok
      posts {
        ...PostGridFragment
      }
    }
  }
  ${POST_GRID_FRAGMENT}
`;

export interface ISeePostsByUsernameFile {
  id: number;
  posterPath: string;
  postId: number;
}

export interface ISeePostsByUsernamePost {
  id: number;
  files: ISeePostsByUsernameFile[];
}

export interface ISeePostsByUsernameOutput {
  ok: boolean;
  posts: ISeePostsByUsernamePost[];
}

export interface ISeePostsByUsername {
  seePostsByUsername: ISeePostsByUsernameOutput;
}

export interface ISeePostsByUsernameInput {
  username: string;
}

export interface ISeePostsByUsernameVariables {
  input: ISeePostsByUsernameInput;
}

import { gql, useApolloClient, useQuery } from '@apollo/client';

export const useCacheSeeSearchPosts = (keyword: string) => {
  const apolloClient = useApolloClient();
  const data = apolloClient.readQuery<ISeeSearchPosts, ISeeSearchPostsVariables>({
    query: SEE_SEARCH_POSTS_QUERY,
    variables: {
      input: {
        keyword,
        offset: 0,
      },
    },
  });
  return {
    posts: data?.searchPosts.posts,
    hasNextPage: !!data?.searchPosts.hasNextPage,
  };
};

export const useSeeSearchPosts = () => {
  const { data, loading, refetch, fetchMore, error, called } = useQuery<ISeeSearchPosts, ISeeSearchPostsVariables>(
    SEE_SEARCH_POSTS_QUERY
  );

  return {
    data,
    loading,
    refetch,
    fetchMore,
    error,
    called,
  };
};

export const SEE_SEARCH_POSTS_QUERY = gql`
  query SearchPosts($input: ISearchPostsInput!) {
    searchPosts(input: $input) {
      ok
      error
      hasNextPage
      posts {
        id
        files {
          id
          posterPath
          postId
        }
      }
    }
  }
`;

export interface ISeeSearchPostsPost {
  id: number;
  files: {
    id: number;
    posterPath: string;
    postId: number;
  }[];
}

export interface ISeeSearchPostsOutput {
  ok: boolean;
  error: string | null;
  hasNextPage: boolean;
  posts: ISeeSearchPostsPost[];
}

export interface ISeeSearchPosts {
  searchPosts: ISeeSearchPostsOutput;
}

export interface ISeeSearchPostsInput {
  keyword: string;
  offset: number;
}

export interface ISeeSearchPostsVariables {
  input: ISeeSearchPostsInput;
}

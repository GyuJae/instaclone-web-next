import { gql, useApolloClient, useQuery } from '@apollo/client';
import { POST_GRID_FRAGMENT } from '@apollo/fragments/post.fragment';

export const useCacheSeePostsByHashtag = (hashtag: string) => {
  const apolloClient = useApolloClient();
  const data = apolloClient.readQuery<ISeePostsByHashtag, ISeePostsByHashtagVariables>({
    query: SEE_POSTS_BY_HASHTAG_QUERY,
    variables: {
      input: {
        hashtag,
      },
    },
  });

  return {
    posts: data?.seePostsByHashtag.posts,
  };
};

export const useSeePostsByHashtag = (hashtag: string) => {
  const { data, loading, refetch, error } = useQuery<ISeePostsByHashtag, ISeePostsByHashtagVariables>(
    SEE_POSTS_BY_HASHTAG_QUERY,
    {
      variables: {
        input: {
          hashtag,
        },
      },
    }
  );

  return {
    posts: data?.seePostsByHashtag.posts,
    loading,
    refetch,
    error,
  };
};

export const SEE_POSTS_BY_HASHTAG_QUERY = gql`
  query SeePostsByHashtag($input: ISeePostsByHashtagInput!) {
    seePostsByHashtag(input: $input) {
      ok
      posts {
        ...PostGridFragment
      }
    }
  }
  ${POST_GRID_FRAGMENT}
`;

export interface ISeePostsByHashtagFile {
  id: number;
  posterPath: string;
  postId: number;
}

export interface ISeePostsByHashtagPost {
  id: number;
  files: ISeePostsByHashtagFile[];
}

export interface ISeePostsByHashtagOutput {
  ok: boolean;
  posts: ISeePostsByHashtagPost[];
}

export interface ISeePostsByHashtag {
  seePostsByHashtag: ISeePostsByHashtagOutput;
}

export interface ISeePostsByHashtagInput {
  hashtag: string;
}

export interface ISeePostsByHashtagVariables {
  input: ISeePostsByHashtagInput;
}

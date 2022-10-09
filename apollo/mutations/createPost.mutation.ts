import { gql, useMutation } from '@apollo/client';
import { SEE_FEED_QUERY } from '@apollo/queries/seeFeed.query';

export const useCreatePost = () => {
  const [mutate, { loading, data }] = useMutation<ICreatePostMutation, ICreatePostVariables>(CREATE_POST_MUTATION, {
    refetchQueries: [
      {
        query: SEE_FEED_QUERY,
        variables: {
          input: {
            offset: 0,
          },
        },
      },
    ],
  });

  return {
    mutate,
    loading,
    data,
  };
};

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: ICreatePostInput!) {
    createPost(input: $input) {
      ok
    }
  }
`;

export interface ICreatePostOutput {
  ok: boolean;
}

export interface ICreatePostMutation {
  createPost: ICreatePostOutput;
}

export interface ICreatePostInput {
  caption?: string | null;
  files: string[];
}

export interface ICreatePostVariables {
  input: ICreatePostInput;
}

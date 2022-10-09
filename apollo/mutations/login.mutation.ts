import { gql, useMutation } from '@apollo/client';

export const useLogin = () => {
  const [loginMutate, { loading }] = useMutation<ILoginMutation, ILoginVariables>(LOGIN_MUTATION, {
    refetchQueries: 'all',
    update: (cache, { data }) => {
      if (data && data.login.ok && data.login.token) {
        cache.modify({
          id: 'ROOT_QUERY',
          fields: {
            isLoggedIn() {
              return true;
            },
            token() {
              return data.login.token;
            },
          },
        });
      }
    },
  });

  return {
    loginMutate,
    loading,
  };
};

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ok
      token
      error
    }
  }
`;

export interface ILoginOutput {
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface ILoginMutation {
  login: ILoginOutput;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginVariables {
  input: ILoginInput;
}

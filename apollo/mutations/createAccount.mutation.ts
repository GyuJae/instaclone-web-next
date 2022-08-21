import { gql, useMutation } from '@apollo/client';

export const useCreateAccount = () => {
  const [createAccountMutate, { loading }] = useMutation<ICreateAccountMutation, ICreateAccountVariables>(
    CREATE_ACCOUNT_MUTAION
  );

  return {
    createAccountMutate,
    loading,
  };
};

export const CREATE_ACCOUNT_MUTAION = gql`
  mutation CreateAccount($input: CraeteAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

export interface ICreateAccountOutput {
  ok: boolean;
  error: string | null;
}

export interface ICreateAccountMutation {
  createAccount: ICreateAccountOutput;
}

export interface ICreateAccountInput {
  email: string;
  username: string;
  password: string;
}

export interface ICreateAccountVariables {
  input: ICreateAccountInput;
}

import { makeVar } from "@apollo/client";

export const TOKEN = 'token'

export const isLoggedInVar = makeVar<boolean>(false);
export const tokenVar = makeVar<string>('');

export const logInUser = (token: string) => {
  isLoggedInVar(true)
  tokenVar(token)
}

export const logOutUser = () => {
  isLoggedInVar(false);
  tokenVar('');
};
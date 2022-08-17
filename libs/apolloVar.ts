import { makeVar } from "@apollo/client";

const TOKEN = 'token'

export const isLoggedInVar = makeVar<boolean>(false);
export const tokenVar = makeVar<string>('');

export const logInUser = (token: string) => {
  localStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
  tokenVar(token)
}

export const logOutUser = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar('');
};
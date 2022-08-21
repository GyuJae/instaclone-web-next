import { useApolloClient } from '@apollo/client';

export const useLogout = () => {
  const apolloClient = useApolloClient();
  const mutate = () => {
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          apolloClient.cache.modify({
            id: 'ROOT_QUERY',
            fields: {
              isLoggedIn() {
                return false;
              },
              token() {
                return '';
              },
            },
          });
        }
      });
  };

  return {
    mutate,
  };
};

import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const apolloClient = useApolloClient();
  const mutate = () => {
    setLoading(true);
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
          router.replace('/auth/login');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    mutate,
    loading,
  };
};

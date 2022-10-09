import { useState } from 'react';

export const useSetToken = () => {
  const [loading, setLoading] = useState(false);
  const mutate = async (token: string) => {
    setLoading(true);
    await fetch('/api/auth/setToken', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).finally(() => setLoading(false));
  };

  return {
    mutate,
    loading,
  };
};

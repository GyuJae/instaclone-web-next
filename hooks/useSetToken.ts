export const useSetToken = () => {
  const mutate = (token: string) => {
    fetch('/api/auth/setToken', {
      method: 'POST',
      body: JSON.stringify({token}),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return {
    mutate,
  }
}
export const useLogout = () => {
  const mutate = () => {
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return {
    mutate
  }
}
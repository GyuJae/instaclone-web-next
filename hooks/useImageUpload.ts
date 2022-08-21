import { useState } from 'react';

export const useImageUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const mutate = async () => {
    setLoading(true);
    const { id: avatarName, uploadURL } = await fetch('http://localhost:4000/imgFile')
      .then((res) => res.json())
      .finally(() => setLoading(false));

    return {
      avatarName,
      uploadURL,
    };
  };

  return {
    mutate,
    loading,
  };
};

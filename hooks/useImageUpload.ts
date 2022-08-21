export const useImageUpload = () => {
  const mutate = async () => {
    const { id: avatarName, uploadURL } = await fetch('http://localhost:4000/imgFile').then((res) => res.json());

    return {
      avatarName,
      uploadURL,
    };
  };

  return {
    mutate,
  };
};

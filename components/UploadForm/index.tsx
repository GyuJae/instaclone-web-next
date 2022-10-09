import { useReactiveVar } from '@apollo/client';
import { useCreatePost } from '@apollo/mutations/createPost.mutation';
import Modal from '@components/Modal';
import { isUploadComponentVar } from '@libs/apolloVar';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from './Form';
import Previews from './Previews';
import Title from './Title';

interface IForm {
  files: FileList | null;
  caption?: string | null;
}

interface IPreview {
  id: number;
  posterPath: string;
}

const UploadForm = () => {
  const [previews, setPreviews] = useState<IPreview[]>([]);
  const { register, watch, setValue, handleSubmit } = useForm<IForm>();
  const { loading, mutate } = useCreatePost();
  const onSubmit: SubmitHandler<IForm> = ({ files, caption }) => {
    if (loading) return;
    const filesUrls: string[] = [];
    if (files && files.length > 0) {
      Object.values(files).forEach(async (image) => {
        const { uploadURL } = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL
            ? process.env.NEXT_PUBLIC_BACKEND_URL + 'imgFile'
            : 'http://localhost:4000/imgFile'
        ).then((res) => res.json());
        const form = new FormData();
        form.append('file', image, image.name);
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
          .then((res) => res.json())
          .then((data) => {
            const {
              result: { id },
            } = data;
            filesUrls.push(`https://imagedelivery.net/ZYLViq3IecpAakTgPse5sg/${id}/instaFile`);
          })
          .then(() => {
            if (filesUrls.length === files.length) {
              mutate({
                variables: {
                  input: {
                    files: filesUrls,
                    caption,
                  },
                },
              });
              handleClose();
            }
          });
      });
    }
  };

  const inView = useReactiveVar(isUploadComponentVar);

  const handleClose = () => {
    handleDeleteSelectFiles();
    isUploadComponentVar(false);
  };

  const handleDeleteSelectFiles = () => {
    setPreviews([]);
    setValue('files', null);
  };

  const filesWatch = watch('files');

  useEffect(() => {
    if (filesWatch && filesWatch.length > 0) {
      Object.values(filesWatch).forEach((image, index) => {
        if (index === 0) {
          setPreviews([{ id: index, posterPath: URL.createObjectURL(image) }]);
        } else {
          setPreviews((prev) => [...prev, { id: index, posterPath: URL.createObjectURL(image) }]);
        }
      });
    }
  }, [filesWatch]);

  if (!inView) return null;
  return (
    <Modal inView={inView} handler={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center rounded-md bg-white py-2'>
        <Title
          isSelectImages={previews.length > 0}
          handleDeleteSelectFiles={handleDeleteSelectFiles}
          loading={loading}
        />
        <Form inView={previews.length === 0} register={register} />
        <Previews inView={previews.length > 0} previews={previews} register={register('caption')} />
      </form>
    </Modal>
  );
};

export default UploadForm;

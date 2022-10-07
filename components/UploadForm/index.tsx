import { useReactiveVar } from '@apollo/client';
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

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  const inView = useReactiveVar(isUploadComponentVar);

  const handleClose = () => {
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
        <Title isSelectImages={previews.length > 0} handleDeleteSelectFiles={handleDeleteSelectFiles} />
        <Form inView={previews.length === 0} register={register} />
        <Previews inView={previews.length > 0} previews={previews} register={register('caption')} />
      </form>
    </Modal>
  );
};

export default UploadForm;

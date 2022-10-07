import { useReactiveVar } from '@apollo/client';
import Modal from '@components/Modal';
import { isUploadComponentVar } from '@libs/apolloVar';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from './Form';
import Previews from './Previews';
import Title from './Title';

interface IForm {
  files: FileList | null;
}

interface IPreview {
  id: number;
  posterPath: string;
}

const UploadForm = () => {
  const [previews, setPreviews] = useState<IPreview[]>([]);
  const { register, watch, setValue } = useForm<IForm>();

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
      <div className='flex w-96 flex-col justify-center rounded-md bg-white py-2'>
        <Title isSelectImages={previews.length > 0} handleDeleteSelectFiles={handleDeleteSelectFiles} />
        <Form inView={previews.length === 0} register={register} />
        <Previews inView={previews.length > 0} previews={previews} />
      </div>
    </Modal>
  );
};

export default UploadForm;

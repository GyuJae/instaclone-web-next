import { useReactiveVar } from '@apollo/client';
import Modal from '@components/Modal';
import { isUploadComponentVar } from '@libs/apolloVar';
import React, { useId } from 'react';
import { useForm } from 'react-hook-form';
import CameraIcon from '@assets/svgs/camera.svg';

interface IForm {
  files: FileList;
}

const UploadForm = () => {
  const formId = useId();
  const { register } = useForm<IForm>();
  const inView = useReactiveVar(isUploadComponentVar);

  const handleClose = () => {
    isUploadComponentVar(false);
  };

  if (!inView) return null;
  return (
    <Modal inView={inView} handler={handleClose}>
      <div className='flex w-96 flex-col justify-center rounded-md bg-white py-2'>
        <h3 className='w-full border-b-[1.5px] py-2 text-center font-semibold'>Create New Post</h3>
        <form className='flex h-36 flex-col items-center justify-center space-y-3'>
          <>
            <label htmlFor={formId}>
              <div className='w-12 cursor-pointer fill-gray-300'>
                <CameraIcon />
              </div>
            </label>
            <input
              id={formId}
              accept='image/*'
              className='hidden'
              type='file'
              multiple
              {...register('files', { required: true })}
            />
          </>
          <label htmlFor={formId}>
            <div className='cursor-pointer rounded-md bg-blue-400 py-1 px-3  text-sm font-semibold text-white'>
              Select From Computer
            </div>
          </label>
        </form>
      </div>
    </Modal>
  );
};

export default UploadForm;

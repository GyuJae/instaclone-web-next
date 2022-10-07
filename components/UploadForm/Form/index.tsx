import React, { useId } from 'react';
import CameraIcon from '@assets/svgs/camera.svg';
import { UseFormRegister } from 'react-hook-form';

interface IProps {
  inView: boolean;
  register: UseFormRegister<{ files: FileList | null; caption?: string | null }>;
}

const Form: React.FC<IProps> = ({ inView, register }) => {
  const formId = useId();
  if (!inView) return null;
  return (
    <div className='flex h-36 w-96 flex-col items-center justify-center space-y-3'>
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
      <label htmlFor={formId}>
        <div className='cursor-pointer rounded-md bg-blue-400 py-1 px-3  text-sm font-semibold text-white'>
          Select From Computer
        </div>
      </label>
    </div>
  );
};

export default Form;

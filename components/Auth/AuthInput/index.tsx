import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  label: string;
  type: 'text' | 'password';
  name: string;
  register: UseFormRegisterReturn;
  [kay: string]: any;
}

const AuthInput: React.FC<IProps> = ({ label, type, name, register, ...rest }) => {
  return (
    <input
      id={name}
      type={type}
      autoComplete='off'
      placeholder={label}
      className='w-full rounded-sm border-[1.5px] border-gray-200 bg-gray-100'
      {...register}
      {...rest}
    />
  );
};

export default AuthInput;

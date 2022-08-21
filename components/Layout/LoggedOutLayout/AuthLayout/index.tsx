import React, { PropsWithChildren } from 'react';
import PathPush from './PathPush';
import InstagramIcon from '@assets/svgs/instagram.svg';

interface IProps {
  type: 'login' | 'createAccount';
}

const AuthLayout: React.FC<PropsWithChildren<IProps>> = ({ type, children }) => {
  return (
    <div className='space-y-2'>
      <div className='flex w-96 flex-col items-center justify-center border-2 border-gray-300 bg-white py-2'>
        <div className='w-12 fill-gray-300'>
          <InstagramIcon />
        </div>
        {children}
      </div>
      <PathPush type={type} />
    </div>
  );
};

export default AuthLayout;

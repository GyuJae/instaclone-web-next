import { cls } from '@libs/index';
import React, { ReactElement } from 'react';

interface IProps {
  payload: string | ReactElement;
  isValid: boolean;
  loading: boolean;
}

const AuthSubmitButton: React.FC<IProps> = ({ payload, isValid, loading }) => {
  const buttonPayload = loading ? 'loading...' : payload;

  return (
    <button
      type='submit'
      className={cls(
        'w-full rounded-sm bg-blue-500 py-2 font-semibold text-white hover:brightness-105 active:brightness-95 ',
        !isValid ? 'opacity-70' : ''
      )}
    >
      {buttonPayload}
    </button>
  );
};

export default AuthSubmitButton;

import { cls } from '@libs/index';
import React from 'react'

interface IProps {
  payload: string;
  isValid: boolean;
}

const AuthSubmitButton:React.FC<IProps> = ({payload, isValid}) => {
  return (
    <button
      type='submit'
      className={cls(
        'w-full rounded-sm bg-blue-500 py-2 font-semibold text-white hover:brightness-105 active:brightness-95 ',
        !isValid ? 'opacity-70': ''
      )}
    >
      {payload}
    </button>
  )
}

export default AuthSubmitButton
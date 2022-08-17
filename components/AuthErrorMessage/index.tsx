import React from 'react'

interface IProps {
  inView: boolean;
  message: string;
}

const AuthErrorMessage:React.FC<IProps> = ({inView, message}) => {
  if(!inView) return null
  
  return (
    <span className='px-1 text-sm font-semibold text-red-500'>{message}</span>
  )
}

export default AuthErrorMessage
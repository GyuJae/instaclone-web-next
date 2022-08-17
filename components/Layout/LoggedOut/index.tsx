import React, { PropsWithChildren } from 'react'
import logoPic from '@assets/images/logo.png'
import Image from 'next/image';

interface IProps {
  inView: boolean;
  title?: string
}

const LoggedOut:React.FC<PropsWithChildren<IProps>> = ({children, inView}) => {
  if (!inView) return null
  
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-200'>
      <Image src={logoPic} alt='Instagram logo' width={380} height={150} />
      {children}
    </div>
  )
}

export default LoggedOut
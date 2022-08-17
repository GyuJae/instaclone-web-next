import React, { PropsWithChildren } from 'react'
import logoPic from '@assets/images/logo.png'
import Image from 'next/image';
import AuthLayout from '@components/Layout/LoggedOut/AuthLayout';
import { useRouter } from 'next/router';

interface IProps {
  inView: boolean;
  title?: string
}

type TPathnameType = 'login' | 'createAccount'

const LoggedOut: React.FC<PropsWithChildren<IProps>> = ({ children, inView }) => {
  const { pathname } = useRouter()

  const pathnameType = {
    '/auth/create-account': 'createAccount',
    '/auth/login': 'login'
  }[pathname] || 'login'

  if (!inView) return null
  
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gray-200'>
      <Image src={logoPic} alt='Instagram logo' width={270} height={100} />
      <AuthLayout type={pathnameType as TPathnameType}>
        {children}
      </AuthLayout>
    </main>
  )
}

export default LoggedOut
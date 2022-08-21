import React, { PropsWithChildren } from 'react';
import logoPic from '@assets/images/logo.png';
import Image from 'next/image';
import AuthLayout from '@components/Layout/LoggedOutLayout/AuthLayout';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface IProps {
  title?: string;
}

type TPathnameType = 'login' | 'createAccount';

const LoggedOutLayout: React.FC<PropsWithChildren<IProps>> = ({ children, title }) => {
  const headTitle = title ? `Instagram | ${title}` : 'Instagram';
  const { pathname } = useRouter();

  const pathnameType =
    {
      '/auth/create-account': 'createAccount',
      '/auth/login': 'login',
    }[pathname] || 'login';

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gray-200'>
        <Image src={logoPic} alt='Instagram logo' width={270} height={100} />
        <AuthLayout type={pathnameType as TPathnameType}>{children}</AuthLayout>
      </main>
    </>
  );
};

export default LoggedOutLayout;

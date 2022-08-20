import { useLogout } from '@hooks/useLogout';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react'
import Header from './Header';

interface IProps {
  title?: string;
}

const LoggedInLayout: React.FC<PropsWithChildren<IProps>> = ({ children, title }) => {
  const headTitle = title ? `Instagram | ${title}` : 'Instagram'
  const { mutate: logoutMutate } = useLogout()
  const handleClickLogout = () => {
    logoutMutate()
  }
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Header />
      <main>
        {children}
      </main>
      <button type='button' onClick={handleClickLogout} className="fixed bottom-5 right-5 h-12 w-12 rounded-full bg-rose-400 hover:brightness-110 active:brightness-75">
        Loggout
      </button>
    </>
  )
}

export default LoggedInLayout
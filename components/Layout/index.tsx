import React, { PropsWithChildren } from 'react'
import { useReactiveVar } from '@apollo/client'
import { isLoggedInVar } from '@libs/apolloVar'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import Head from 'next/head'

interface IProps {
  title?: string
}

const Layout:React.FC<PropsWithChildren<IProps>> = ({title, children}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const headTitle = title ? `Instagram: ${title}` : 'Instagram';
  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <LoggedIn inView={isLoggedIn}>
        {children}
      </LoggedIn>
      <LoggedOut inView={!isLoggedIn}>
        {children}
      </LoggedOut>
    </>
  )
}

export default Layout
import React, { PropsWithChildren, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { isLoggedInVar } from '@libs/apolloVar'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface IProps {
  title?: string;
  protectedPage?: boolean;
}

const Layout:React.FC<PropsWithChildren<IProps>> = ({title, children, protectedPage = true}) => {
  const router = useRouter()
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const headTitle = title ? `Instagram: ${title}` : 'Instagram';

  useEffect(() => {
    if (!isLoggedIn && protectedPage) router.replace('/auth/login')
    if (isLoggedIn && !protectedPage) router.replace('/')
  }, [isLoggedIn, protectedPage, router])

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
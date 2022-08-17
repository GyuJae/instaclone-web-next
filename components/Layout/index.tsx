import React, { PropsWithChildren } from 'react'
import { useReactiveVar } from '@apollo/client'
import { isLoggedInVar } from '@libs/apolloVar'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

interface IProps {
  title?: string
}

const Layout:React.FC<PropsWithChildren<IProps>> = ({title,children}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  
  return (
    <>
      <LoggedIn inView={isLoggedIn} title={title}>
        {children}
      </LoggedIn>
      <LoggedOut inView={!isLoggedIn} title={title}>
        {children}
      </LoggedOut>
    </>
  )
}

export default Layout
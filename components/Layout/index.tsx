import React, { PropsWithChildren } from 'react'
import { useReactiveVar } from '@apollo/client'
import { isLoggedInVar } from '@libs/apolloVar'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

interface IProps {
  title?: string
}

const Layout:React.FC<PropsWithChildren<IProps>> = ({title}) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  
  return (
    <>
      <LoggedIn inView={isLoggedIn} title={title} />
      <LoggedOut inView={!isLoggedIn} title={title} />
    </>
  )
}

export default Layout
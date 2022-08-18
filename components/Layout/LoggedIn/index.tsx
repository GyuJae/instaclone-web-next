import React, { PropsWithChildren } from 'react'
import Header from './Header';

interface IProps {
  inView: boolean;
}

const LoggedIn:React.FC<PropsWithChildren<IProps>> = ({children, inView}) => {
  if (!inView) return null
  
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  )
}

export default LoggedIn
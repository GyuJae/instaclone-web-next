import React, { PropsWithChildren } from 'react'

interface IProps {
  inView: boolean;
  title?: string
}

const LoggedIn:React.FC<PropsWithChildren<IProps>> = ({children, inView}) => {
  
  if(!inView) return null
  return (
    <main>
      {children}
    </main>
  )
}

export default LoggedIn
import React, { PropsWithChildren } from 'react'

interface IProps {
  inView: boolean;
  title?: string
}

const LoggedIn:React.FC<PropsWithChildren<IProps>> = ({children, inView}) => {
  
  if(!inView) return null
  return (
    <div>
      {children}
    </div>
  )
}

export default LoggedIn
import React, { useMemo } from 'react'
import { useMe } from '@apollo/queries/me.query'
import Avatar from '@components/Avatar'
import Logo from './Logo'
import SearchInput from '../SearchInput'

const Header = () => {
  const { user } = useMe()
  
  const UserAvatar = useMemo(() => { 
    if(!user) return <div />
    return (
      <Avatar avatar={user.avatar} />
    )
  }, [user])

  return (
    <header className='sticky top-0 flex items-center justify-between border-b-2 px-6 py-5 shadow-sm'>
      <Logo />
      <SearchInput />
      {UserAvatar}
    </header>
  )
}

export default Header
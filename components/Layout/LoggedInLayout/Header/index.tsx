import React from 'react'
import { useMe } from '@apollo/queries/me.query'
import Avatar from '@components/Avatar'
import Logo from './Logo'
import SearchInput from '../SearchInput'

const Header = () => {
  const { user } = useMe()
  
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between border-b-2 bg-white px-6 py-5 shadow-sm'>
      <Logo />
      <SearchInput />
      <Avatar avatar={user?.avatar} />
    </header>
  )
}

export default Header
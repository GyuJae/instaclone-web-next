import React from 'react'
import { useCacheMe } from '@apollo/queries/me.query'
import Avatar from '@components/Avatar'
import Logo from './Logo'
import SearchInput from '../SearchInput'
import Link from 'next/link'

const Header = () => {
  const { user } = useCacheMe()
  
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between border-b-2 bg-white px-6 py-5 shadow-sm'>
      <Logo />
      <SearchInput />
      <Link href={`/profile/${user?.username}`}>
        <a>
          <Avatar avatar={user?.avatar} />
        </a>
      </Link>
    </header>
  )
}

export default Header
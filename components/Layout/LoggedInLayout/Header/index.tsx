import React from 'react';
import { useCacheMe } from '@apollo/queries/me.query';
import Avatar from '@components/Avatar';
import Logo from './Logo';
import SearchInput from '../SearchInput';
import Link from 'next/link';
import LoadingBar from './LoadingBar';
import SquarePulsIcon from '@assets/svgs/square-plus.svg';
import { isUploadComponentVar } from '@libs/apolloVar';

const Header = () => {
  const { user } = useCacheMe();
  const handleOpenUploadModal = () => {
    isUploadComponentVar(true);
  };

  return (
    <header className='sticky top-0 z-50 flex items-center justify-between border-b-2 bg-white px-6 py-5 shadow-sm'>
      <Logo />
      <SearchInput />
      <div className='flex items-center justify-center space-x-5'>
        <button type='button' onClick={handleOpenUploadModal} className='h-6 w-6 fill-black'>
          <SquarePulsIcon />
        </button>
        <Link href={`/profile/${user?.username}`}>
          <a>
            <Avatar avatar={user?.avatar} />
          </a>
        </Link>
      </div>
      <LoadingBar />
    </header>
  );
};

export default Header;

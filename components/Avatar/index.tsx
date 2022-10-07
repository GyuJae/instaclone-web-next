import React from 'react';
import Image from 'next/image';
import CircleUserIcon from '@assets/svgs/circle-user.svg';
import { cls } from '@libs/index';

interface IProps {
  size?: 'S' | 'M' | 'L';
  avatar?: string | null;
}

const Avatar: React.FC<IProps> = ({ size = 'S', avatar }) => {
  const sizeToNum = {
    S: 40,
    M: 60,
    L: 80,
  }[size];

  const sizeToTailwind = {
    S: 'w-10 h-10',
    M: 'w-14 h-14',
    L: 'w-20 h-20',
  }[size];

  if (!avatar) {
    return (
      <div className={cls(sizeToTailwind, 'fill-gray-300')}>
        <CircleUserIcon />
      </div>
    );
  }

  return <Image src={avatar} alt='avatar' priority width={sizeToNum} height={sizeToNum} className='rounded-full' />;
};

export default Avatar;

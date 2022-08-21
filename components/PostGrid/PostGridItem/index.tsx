import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IProps {
  file: {
    id: number;
    posterPath: string;
    postId: number;
  };
  username: string;
}

const PostGridItem: React.FC<IProps> = (props) => {
  const { username, file } = props;
  return (
    <li className='h-36 w-full'>
      <Link
        href={{
          pathname: `/profile/${username}/`,
          query: { p: file.postId },
        }}
        scroll={false}
      >
        <a>
          <div className='relative h-full w-full rounded-sm bg-black hover:brightness-110 active:brightness-90'>
            <Image
              alt={`${username}-${file.postId}`}
              src={file.posterPath}
              layout='fill'
              objectFit='contain'
              className='absolute'
              priority
            />
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostGridItem;

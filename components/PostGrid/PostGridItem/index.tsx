import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IProps {
  file: {
    id: number;
    posterPath: string;
    postId: number;
  };
  callbackURL: {
    pathname: string;
    query?: {
      [key: string]: string;
    };
  };
}

const PostGridItem: React.FC<IProps> = (props) => {
  const { callbackURL, file } = props;
  return (
    <li className='h-36 w-full'>
      <Link
        href={{
          pathname: callbackURL.pathname,
          query: { p: file.postId, ...callbackURL.query },
        }}
        scroll={false}
      >
        <a>
          <div className='relative h-full w-full rounded-sm bg-black hover:brightness-110 active:brightness-90'>
            <Image
              alt={`photo-${file.postId}`}
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

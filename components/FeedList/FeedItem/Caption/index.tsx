import Link from 'next/link';
import React from 'react';

interface IProps {
  postId: number;
  caption: string;
  username: string;
}

const Caption: React.FC<IProps> = ({ caption, username, postId }) => {
  return (
    <div className='flex items-center space-x-2 p-2 text-sm'>
      <span className='font-semibold'>{username}</span>
      <span>
        {caption.split(' ').map((word, index) => {
          const key = `caption-${word}-${index}-${postId}`;
          if (/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w-]+/g.test(word)) {
            return (
              <React.Fragment key={key}>
                <Link href={`/hashtag/${word.slice(1)}`}>
                  <a className='text-blue-800'>{word} </a>
                </Link>
              </React.Fragment>
            );
          }
          return <React.Fragment key={key}>{word} </React.Fragment>;
        })}
      </span>
    </div>
  );
};

export default Caption;

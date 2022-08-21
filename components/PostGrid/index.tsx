import React from 'react';

interface IProps {
  files: string[];
}

const PostGrid: React.FC<IProps> = () => {
  return <div className='grid w-full grid-cols-3 gap-2'></div>;
};

export default PostGrid;

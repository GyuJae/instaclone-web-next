import Files from '@components/FeedList/FeedItem/Files';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  inView: boolean;
  previews: {
    id: number;
    posterPath: string;
  }[];
  register: UseFormRegisterReturn<'caption'>;
}

const Previews: React.FC<IProps> = ({ inView, previews, register }) => {
  if (!inView) return null;
  return (
    <div className='flex h-full '>
      <div className='w-96'>
        <Files files={previews} isDetail />
      </div>
      <textarea className='m-[2px] h-[480px] w-72 resize-none border-[1px] border-gray-400' {...register} />
    </div>
  );
};

export default Previews;

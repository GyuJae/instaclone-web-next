import React from 'react';
import LeftIcon from '@assets/svgs/chevron-left.svg';

interface IProps {
  isSelectImages: boolean;
  handleDeleteSelectFiles: () => void;
  loading: boolean;
}

const Title: React.FC<IProps> = ({ isSelectImages, handleDeleteSelectFiles, loading }) => {
  return (
    <div className='relative'>
      {isSelectImages && (
        <button type='button' onClick={handleDeleteSelectFiles} className='absolute left-3 top-[10px]'>
          <div className='w-3'>
            <LeftIcon />
          </div>
        </button>
      )}
      <h3 className='w-full border-b-[1.5px] py-2 text-center font-semibold'>Create New Post</h3>
      {isSelectImages && (
        <button type='submit' disabled={loading} className='absolute right-3 top-[10px] font-semibold text-blue-400'>
          {loading ? 'loading...' : 'Share'}
        </button>
      )}
    </div>
  );
};

export default Title;

import React from 'react';

interface IProps {
  inView: boolean;
}

const Message: React.FC<IProps> = ({ inView }) => {
  if (!inView) return null;
  return (
    <div className='my-auto flex h-6 items-center justify-center rounded-md bg-gray-200 px-2 text-xs font-semibold'>
      Log Out
    </div>
  );
};

export default Message;

import React, { useState } from 'react';
import LogoutIcon from '@assets/svgs/logout.svg';
import { useLogout } from '@hooks/useLogout';
import Message from './Message';

interface IProps {
  inView: boolean;
}

const Logout: React.FC<IProps> = ({ inView }) => {
  const [isOpenMessage, setIsOpenMessage] = useState<boolean>(false);
  const { mutate: logoutMutate } = useLogout();

  const handlerClickLogout = () => {
    logoutMutate();
  };

  const handleHoverOpenMessage = () => {
    setIsOpenMessage(true);
  };

  const handleBlurCloseMessage = () => {
    setIsOpenMessage(false);
  };

  if (!inView) return null;
  return (
    <>
      <button
        name='logout'
        type='button'
        onClick={handlerClickLogout}
        onMouseEnter={handleHoverOpenMessage}
        onMouseLeave={handleBlurCloseMessage}
      >
        <div className='h-4 w-4 fill-black hover:fill-gray-700 active:fill-gray-900'>
          <LogoutIcon />
        </div>
      </button>
      <Message inView={isOpenMessage} />
    </>
  );
};

export default Logout;

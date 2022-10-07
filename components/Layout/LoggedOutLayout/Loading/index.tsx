import { useReactiveVar } from '@apollo/client';
import Modal from '@components/Modal';
import { isRouteLoadingVar } from '@libs/apolloVar';
import SpinnerIcon from '@assets/svgs/spinner.svg';
import { motion } from 'framer-motion';
import React from 'react';

const Loading = () => {
  const inView = useReactiveVar(isRouteLoadingVar);

  return (
    <Modal inView={inView}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ ease: 'linear', duration: 0.8, repeat: Infinity }}
        className='h-12 w-12 fill-blue-400'
      >
        <SpinnerIcon />
      </motion.div>
    </Modal>
  );
};

export default Loading;

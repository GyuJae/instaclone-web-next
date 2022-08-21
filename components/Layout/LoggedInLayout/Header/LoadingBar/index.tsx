import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useReactiveVar } from '@apollo/client';
import { isRouteLoadingVar } from '@libs/apolloVar';

const variants: Variants = {
  initial: {
    width: '0%',
  },
  animate: {
    width: '100%',
    transition: {
      duration: 1.5,
    },
  },
};

const LoadingBar = () => {
  const inView = useReactiveVar(isRouteLoadingVar);

  if (!inView) return null;
  return (
    <motion.div
      variants={variants}
      initial='initial'
      animate='animate'
      className='absolute -bottom-1 left-0 h-1 w-screen bg-blue-400'
    />
  );
};

export default LoadingBar;

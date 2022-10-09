import React, { useState } from 'react';
import { ISeeFeedFile } from '@apollo/queries/seeFeed.query';
import { Variants, AnimatePresence, motion, PanInfo } from 'framer-motion';
import { wrap } from 'popmotion';
import LeftIcon from '@assets/svgs/chevron-left.svg';
import RightIcon from '@assets/svgs/chevron-right.svg';
import { cls } from '@libs/index';
import Indicator from './Indicator';
import Image from 'next/image';

interface IProps {
  files: ISeeFeedFile[];
  isDetail?: boolean;
}

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const styles = {
  arrowButton: 'absolute z-10 w-2 fill-gray-800 hover:opacity-60',
};

const Files: React.FC<IProps> = ({ files, isDetail = false }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const fileIndex = wrap(0, files.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const handleClickRight = () => {
    paginate(1);
  };

  const handleClickLeft = () => {
    paginate(-1);
  };

  return (
    <div className='relative'>
      <div
        className={cls(
          'relative flex w-full items-center justify-center overflow-hidden bg-black',
          isDetail ? 'min-h-[480px]' : 'min-h-[300px]'
        )}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 350, damping: 35 },
              opacity: { duration: 0.2 },
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className={cls(
              'absolute w-full flex justify-center items-center',
              isDetail ? 'min-h-[480px]' : 'min-h-[300px]'
            )}
          >
            <Image
              alt={`photo-${files[fileIndex].id}`}
              src={files[fileIndex].posterPath}
              layout='fill'
              className='pointer-events-none absolute object-contain'
              priority
            />
          </motion.div>
        </AnimatePresence>
        {files.length > 1 && (
          <>
            <button type='button' onClick={handleClickLeft} className={cls(styles.arrowButton, 'left-5')}>
              <LeftIcon />
            </button>
            <button type='button' onClick={handleClickRight} className={cls(styles.arrowButton, 'right-5')}>
              <RightIcon />
            </button>
          </>
        )}
      </div>
      <div className={cls('absolute w-full z-10', isDetail ? 'bottom-5' : '-bottom-5 ')}>
        <Indicator totalCount={files.length} currentIndex={fileIndex} />
      </div>
    </div>
  );
};

export default Files;

import React, { useState } from 'react'
import { ISeeFeedFile } from '@apollo/queries/seeFeed.query'
import { Variants, AnimatePresence, motion, PanInfo } from 'framer-motion';
import { wrap } from "popmotion";
import Left from '@assets/svgs/chevron-left.svg'
import Right from '@assets/svgs/chevron-right.svg'
import { cls } from '@libs/index';

interface IProps {
  files: ISeeFeedFile[]
}

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const styles = {
  arrowButton: 'absolute z-10 h-12 w-10 fill-gray-800 opacity-0 hover:opacity-60'
}

const Files: React.FC<IProps> = ({ files }) => {
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
  }

  const handleClickRight = () => {
    paginate(1)
  }

  const handleClickLeft = () => {
    paginate(-1)
  }

  return (
    <div className='relative flex h-96 w-full items-center justify-center overflow-hidden bg-black'>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={files[fileIndex].posterPath}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 350, damping: 35},
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className='absolute'
        />
      </AnimatePresence>
      <button type='button' onClick={handleClickLeft} className={cls(styles.arrowButton, 'left-5')}>
        <Left />
      </button>
      <button type='button' onClick={handleClickRight} className={cls(styles.arrowButton, 'right-5')}>
        <Right />
      </button>
    </div>
  )
}

export default Files
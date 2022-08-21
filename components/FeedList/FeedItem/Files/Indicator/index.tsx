import { cls } from '@libs/index';
import React, { useMemo } from 'react';

interface IProps {
  totalCount: number;
  currentIndex: number;
}

const Indicator: React.FC<IProps> = ({ totalCount, currentIndex }) => {
  const list = useMemo(() => {
    return new Array(totalCount).fill(0).map((item, index) => {
      const key = `feed-indicator-${item + index}`;
      return (
        <div
          key={key}
          className={cls('h-[6px] w-[6px] rounded-full', currentIndex === index ? 'bg-blue-500' : 'bg-gray-400')}
        />
      );
    });
  }, [currentIndex, totalCount]);

  if (totalCount <= 1) return null;

  return <div className='flex items-center justify-center space-x-1'>{list}</div>;
};

export default Indicator;

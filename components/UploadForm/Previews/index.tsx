import Files from '@components/FeedList/FeedItem/Files';
import React from 'react';

interface IProps {
  inView: boolean;
  previews: {
    id: number;
    posterPath: string;
  }[];
}

const Previews: React.FC<IProps> = ({ inView, previews }) => {
  if (!inView) return null;
  return (
    <div>
      <Files files={previews} isDetail />
    </div>
  );
};

export default Previews;

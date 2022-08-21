import Modal from '@components/Modal';
import PostDetailItem from '@components/PostDetailItem';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import NoPosts from './NoPosts';
import PostGridItem from './PostGridItem';

interface IProps {
  files?: {
    id: number;
    posterPath: string;
    postId: number;
  }[];
  callbackURL: {
    pathname: string;
    query?: {
      [key: string]: string;
    };
  };
}

const PostGrid: React.FC<IProps> = ({ files, callbackURL }) => {
  const router = useRouter();
  const { query } = router;
  const handlerModal = () => {
    router.push(callbackURL);
  };
  const photoList = useMemo(() => {
    if (!files || files.length === 0) return <NoPosts />;
    return files.map((file, index) => {
      const key = `file-${file.id}-${index}`;
      return <PostGridItem key={key} file={file} callbackURL={callbackURL} />;
    });
  }, [callbackURL, files]);

  return (
    <ul className='grid w-full grid-cols-3 gap-1 py-1'>
      {photoList}
      <Modal inView={!!query.p} handler={handlerModal}>
        <PostDetailItem postId={+(query.p as string) || 0} />
      </Modal>
    </ul>
  );
};

export default PostGrid;

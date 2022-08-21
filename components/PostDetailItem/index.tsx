import { useApolloClient } from '@apollo/client';
import { POST_FEED_FRAGMENT } from '@apollo/fragments/post.fragment';
import { ISeeFeedPost } from '@apollo/queries/seeFeed.query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Photos from './Photos';
import SubContainer from './SubContainer';

interface IProps {
  postId: number;
}

const PostDetailItem: React.FC<IProps> = ({ postId }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const apolloClient = useApolloClient();
  const post = apolloClient.readFragment<ISeeFeedPost>({
    id: `PostEntity:${postId}`,
    fragmentName: 'PostFeedFragment',
    fragment: POST_FEED_FRAGMENT,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!post) {
    router.replace('/');
    return null;
  }
  return (
    <div className='flex h-[500px] rounded-md bg-white py-3'>
      <Photos post={post} />
      <SubContainer postId={postId} />
    </div>
  );
};

export default PostDetailItem;

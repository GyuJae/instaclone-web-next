import { ME_QUERY } from '@apollo/queries/me.query';
import { SEE_COMMENTS_QUERY } from '@apollo/queries/seeComments.query';
import { SEE_FEED_QUERY } from '@apollo/queries/seeFeed.query';
import { ISeeFriends, ISeeFriendsVariables, SEE_FRIENDS_QUERY } from '@apollo/queries/seeFriends.query';
import { ISeeRoom, ISeeRoomVariables, SEE_ROOM_QUERY } from '@apollo/queries/seeRoom.query';
import FeedList from '@components/FeedList';
import Friends from '@components/Friends';
import LoggedInLayout from '@components/Layout/LoggedInLayout';
import MessageRoom from '@components/MessageRoom';
import Modal from '@components/Modal';
import PostDetailItem from '@components/PostDetailItem';
import { addApolloState, initializeApollo } from '@libs/apolloClient';
import { withSsrSession } from '@libs/withSession';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { query, push } = router;
  const handleModal = () => push('/', {}, { scroll: false });
  return (
    <div className='mx-auto max-w-[460px] py-2'>
      <FeedList />
      <div className='absolute top-28 right-5 hidden lg:block'>
        <Friends />
      </div>
      <Modal inView={!!query.p} handler={handleModal}>
        <PostDetailItem postId={+(query.p as string)} />
      </Modal>
      <Modal inView={!!query.mr} handler={handleModal}>
        <MessageRoom />
      </Modal>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout title='Home'>{page}</LoggedInLayout>;
};

export const getServerSideProps: GetServerSideProps = withSsrSession(async ({ req, query }) => {
  if (!req.session.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }

  const apolloClient = initializeApollo();

  if (query.p) {
    await apolloClient.query({
      query: SEE_COMMENTS_QUERY,
      variables: {
        input: {
          postId: +query.p,
          offset: 0,
        },
      },
    });
  }

  if (query.mr) {
    await apolloClient.query<ISeeRoom, ISeeRoomVariables>({
      query: SEE_ROOM_QUERY,
      variables: {
        input: {
          roomId: +query.mr,
        },
      },
    });
  }

  await apolloClient.query({
    query: SEE_FEED_QUERY,
    variables: {
      input: {
        offset: 0,
      },
    },
  });

  await apolloClient.query<ISeeFriends, ISeeFriendsVariables>({
    query: SEE_FRIENDS_QUERY,
    variables: {
      input: {
        offset: 0,
      },
    },
  });

  await apolloClient.query({
    query: ME_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
});

export default Home;

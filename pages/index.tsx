import { ME_QUERY } from '@apollo/queries/me.query';
import { SEE_COMMENTS_QUERY } from '@apollo/queries/seeComments.query';
import { SEE_FEED_QUERY } from '@apollo/queries/seeFeed.query';
import FeedList from '@components/FeedList';
import LoggedInLayout from '@components/Layout/LoggedInLayout';
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
      <Modal inView={!!query.p} handler={handleModal}>
        <PostDetailItem postId={+(query.p as string)} />
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
  await apolloClient.query({
    query: SEE_FEED_QUERY,
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

import { ME_QUERY } from '@apollo/queries/me.query';
import {
  ISeePostsByHashtag,
  ISeePostsByHashtagVariables,
  SEE_POSTS_BY_HASHTAG_QUERY,
  useCacheSeePostsByHashtag,
} from '@apollo/queries/seePostsByHashtag.query';

import LoggedInLayout from '@components/Layout/LoggedInLayout';
import PostGrid from '@components/PostGrid';
import { addApolloState, initializeApollo } from '@libs/apolloClient';
import { withSsrSession } from '@libs/withSession';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

interface IProps {
  hashtag: string;
}

const Hashtag: NextPageWithLayout<IProps> = ({ hashtag }) => {
  const { posts } = useCacheSeePostsByHashtag(hashtag);
  return (
    <div className='mx-auto max-w-[460px] py-2'>
      <PostGrid
        files={posts?.map((post) => post.files[0])}
        callbackURL={{
          pathname: `/hashtag/${hashtag}`,
        }}
      />
    </div>
  );
};

Hashtag.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout title='Hashtag'>{page}</LoggedInLayout>;
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
  if (!query.hashtag) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ME_QUERY,
  });

  await apolloClient.query<ISeePostsByHashtag, ISeePostsByHashtagVariables>({
    query: SEE_POSTS_BY_HASHTAG_QUERY,
    variables: {
      input: {
        hashtag: query.hashtag as string,
      },
    },
  });

  return addApolloState(apolloClient, {
    props: {
      hashtag: query.hashtag,
    },
  });
});

export default Hashtag;

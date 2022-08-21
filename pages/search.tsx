import { ME_QUERY } from '@apollo/queries/me.query';
import {
  ISeeSearchPosts,
  ISeeSearchPostsVariables,
  SEE_SEARCH_POSTS_QUERY,
} from '@apollo/queries/seeSearchPosts.query';
import LoggedInLayout from '@components/Layout/LoggedInLayout';
import PostGrid from '@components/PostGrid';
import { addApolloState, initializeApollo } from '@libs/apolloClient';
import { withSsrSession } from '@libs/withSession';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { useCacheSeeSearchPosts } from '../apollo/queries/seeSearchPosts.query';
import { NextPageWithLayout } from './_app';

interface IProps {
  keyword: string;
}

const Search: NextPageWithLayout<IProps> = ({ keyword }) => {
  const { posts } = useCacheSeeSearchPosts(keyword);
  return (
    <div className='mx-auto max-w-[460px] py-2'>
      <PostGrid
        files={posts?.map((post) => post.files[0])}
        callbackURL={{
          pathname: '/search',
          query: {
            keyword,
          },
        }}
      />
    </div>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout title='Search'>{page}</LoggedInLayout>;
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

  if (!query.keyword) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const apolloClient = initializeApollo();

  await apolloClient.query<ISeeSearchPosts, ISeeSearchPostsVariables>({
    query: SEE_SEARCH_POSTS_QUERY,
    variables: {
      input: {
        keyword: query.keyword as string,
        offset: 0,
      },
    },
  });

  await apolloClient.query({
    query: ME_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {
      keyword: query.keyword,
    },
  });
});

export default Search;

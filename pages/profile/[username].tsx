import { ME_QUERY } from '@apollo/queries/me.query';
import { SEE_COMMENTS_QUERY } from '@apollo/queries/seeComments.query';
import { ISeePost, ISeePostVariables, SEE_POST_QUERY } from '@apollo/queries/seePost.query';
import {
  ISeePostsByUsername,
  ISeePostsByUsernameVariables,
  SEE_POSTS_BY_USERNAME_QUERY,
} from '@apollo/queries/seePostsByUsername.query';
import { ISeeProfile, ISeeProfileVariables, SEE_PROFILE_QUERY } from '@apollo/queries/seeProfile.query';
import LoggedInLayout from '@components/Layout/LoggedInLayout';
import UserProfile from '@components/UserProfile';
import { addApolloState, initializeApollo } from '@libs/apolloClient';
import { withSsrSession } from '@libs/withSession';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

interface IProps {
  username: string;
}

const Profile: NextPageWithLayout<IProps> = ({ username }) => {
  return (
    <div className='mx-auto max-w-[460px] py-2'>
      <UserProfile username={username} />
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout title='Profile'>{page}</LoggedInLayout>;
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

  await apolloClient.query({
    query: ME_QUERY,
  });

  const profileData = await apolloClient.query<ISeeProfile, ISeeProfileVariables>({
    query: SEE_PROFILE_QUERY,
    variables: {
      input: {
        username: query.username as string,
      },
    },
  });

  if (!profileData.data.seeProfile.ok) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  await apolloClient.query<ISeePostsByUsername, ISeePostsByUsernameVariables>({
    query: SEE_POSTS_BY_USERNAME_QUERY,
    variables: {
      input: {
        username: query.username as string,
      },
    },
  });

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
    await apolloClient.query<ISeePost, ISeePostVariables>({
      query: SEE_POST_QUERY,
      variables: {
        input: {
          postId: +query.p,
        },
      },
    });
  }

  return addApolloState(apolloClient, {
    props: {
      username: query.username,
    },
  });
});

export default Profile;

import { ME_QUERY } from '@apollo/queries/me.query'
import { SEE_FEED_QUERY } from '@apollo/queries/seeFeed.query'
import FeedList from '@components/FeedList'
import LoggedInLayout from '@components/Layout/LoggedInLayout'
import { addApolloState, initializeApollo } from '@libs/apolloClient'
import { withSsrSession } from '@libs/withSession'
import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <div className="mx-auto max-w-[460px] py-2">
      <FeedList />
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoggedInLayout title='Home'>{page}</LoggedInLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withSsrSession(
  async ({ req }) => {
    if (!req.session.token) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login"
        }
      }
    }
    
    const apolloClient = initializeApollo(null, req.session.token)
    await apolloClient.query({
      query: SEE_FEED_QUERY,
      variables: {
        input: {
          offset: 0
        }
      },
    })
    await apolloClient.query({
      query: ME_QUERY
    })

    return addApolloState(apolloClient, {
      props: {}
    }) 
})

export default Home

import { ME_QUERY } from '@apollo/queries/me.query'
import { SEE_FEED_QUERY, useSeeFeed } from '@apollo/queries/seeFeed.query'
import LoggedInLayout from '@components/Layout/LoggedInLayout'
import { addApolloState, initializeApollo } from '@libs/apolloClient'
import { withSsrSession } from '@libs/withSession'
import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const {posts} = useSeeFeed()
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1>hello world</h1>
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

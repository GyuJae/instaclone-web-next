import { ME_QUERY } from '@apollo/queries/me.query'
import LoggedInLayout from '@components/Layout/LoggedInLayout'
import { addApolloState, initializeApollo } from '@libs/apolloClient'
import { withSsrSession } from '@libs/withSession'
import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const Profile: NextPageWithLayout = () => {
  return (
    <div className="mx-auto max-w-[460px] py-2">
      
    </div>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoggedInLayout title='Profile'>{page}</LoggedInLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withSsrSession(
  async ({ req, query }) => {
    if (!req.session.token) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login"
        }
      }
    }

    
    
    const apolloClient = initializeApollo(null)
    
    await apolloClient.query({
      query: ME_QUERY
    })

    return addApolloState(apolloClient, {
      props: {}
    }) 
})

export default Profile;

import { useMe } from '@apollo/queries/me.query'
import Layout from '@components/Layout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const {user} = useMe()
  console.log(user)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>hello world</h1>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Home

import { useSeeFeed } from '@apollo/queries/seeFeed.query'
import Layout from '@components/Layout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const {posts} = useSeeFeed()
  console.log(posts)
  
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

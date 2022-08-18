import Layout from '@components/Layout'
import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

const Search: NextPageWithLayout = () => {
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>Search</h1>
    </div>
  )
}

Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}

export default Search

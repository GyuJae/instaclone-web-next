import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useApollo } from '@libs/apolloClient'
import { ApolloProvider } from '@apollo/client'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line unused-imports/no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps)
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ApolloProvider client={apolloClient}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  )
}

export default MyApp

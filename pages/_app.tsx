import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useApollo } from '@libs/apolloClient'
import { ApolloProvider } from '@apollo/client'
import { ReactElement, ReactNode, useEffect } from 'react'
import { NextPage } from 'next'
import { isLoggedInVar, TOKEN, tokenVar } from '@libs/apolloVar'

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
  
  useEffect(() => {
    (() => {
      isLoggedInVar(!!(localStorage.getItem(TOKEN)))
      tokenVar(localStorage.getItem(TOKEN) || "")
    })();
  },[])
  
  return (
    <ApolloProvider client={apolloClient}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  )
}

export default MyApp

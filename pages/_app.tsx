import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { useApollo } from '@libs/apolloClient'
import { ApolloProvider } from '@apollo/client'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { isLoggedInVar, tokenVar } from '@libs/apolloVar'
import App from 'next/app'
import { withAppSession } from '@libs/withSession'

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

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context)
  if (context.ctx.req && context.ctx.res) {
    const {token} = await withAppSession(context)
    tokenVar(token || "")
    isLoggedInVar(!!token)
  }
  
  return {
    ...appProps
  }
}

export default MyApp

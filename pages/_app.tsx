import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { initializeApollo, useApollo } from '@libs/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import App from 'next/app';
import { withAppSession } from '@libs/withSession';
import { AUTH_INFO_QUERY } from '@apollo/queries/auth.query';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  // eslint-disable-next-line unused-imports/no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);
  const getLayout = Component.getLayout || ((page) => page);

  return <ApolloProvider client={apolloClient}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>;
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const { token } = await withAppSession(context);
  const apolloClient = initializeApollo(null, token);
  await apolloClient.cache.writeQuery({
    query: AUTH_INFO_QUERY,
    data: {
      isLoggedIn: !!token,
      token,
    },
  });
  return {
    ...appProps,
  };
};

export default MyApp;

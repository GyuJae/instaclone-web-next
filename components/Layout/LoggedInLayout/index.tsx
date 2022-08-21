import Head from 'next/head';
import React, { PropsWithChildren } from 'react';
import Header from './Header';

interface IProps {
  title?: string;
}

const LoggedInLayout: React.FC<PropsWithChildren<IProps>> = ({ children, title }) => {
  const headTitle = title ? `Instagram | ${title}` : 'Instagram';

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default LoggedInLayout;

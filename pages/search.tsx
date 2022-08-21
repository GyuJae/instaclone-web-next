import LoggedInLayout from '@components/Layout/LoggedInLayout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Search: NextPageWithLayout = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <h1>Search</h1>
    </div>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <LoggedInLayout title='Search'>{page}</LoggedInLayout>;
};

export default Search;

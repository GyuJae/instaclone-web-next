import Link from 'next/link';
import React, { useMemo } from 'react';

interface IProps {
  type: 'login' | 'createAccount';
}

const styles = {
  link: 'ml-2 font-semibold text-blue-400 hover:underline',
};

const PathPush: React.FC<IProps> = ({ type }) => {
  const loginPath = useMemo(() => {
    if (type === 'login') return null;

    return (
      <span>
        Have an account?
        <Link href='/auth/login'>
          <a className={styles.link}>Log in</a>
        </Link>
      </span>
    );
  }, [type]);

  const createAccountPath = useMemo(() => {
    if (type === 'createAccount') return null;

    return (
      <span>
        Do not have an account?
        <Link href='/auth/create-account'>
          <a className={styles.link}>Sign up</a>
        </Link>
      </span>
    );
  }, [type]);

  return (
    <div className='border-2 border-gray-300 bg-white py-4 text-center'>
      {loginPath}
      {createAccountPath}
    </div>
  );
};

export default PathPush;

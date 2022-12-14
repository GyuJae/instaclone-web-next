import { useCreateAccount } from '@apollo/mutations/createAccount.mutation';
import AuthErrorMessage from '@components/Auth/AuthErrorMessage';
import AuthInput from '@components/Auth/AuthInput';
import AuthSubmitButton from '@components/Auth/AuthSubmitButton';
import LoggedOutLayout from '@components/Layout/LoggedOutLayout';
import { withSsrSession } from '@libs/withSession';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app';

interface IForm {
  email: string;
  username: string;
  password: string;
}

const CretaeAccount: NextPageWithLayout = () => {
  const [createAccountError, setCreateAccountError] = useState<string>('');
  const { createAccountMutate, loading } = useCreateAccount();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IForm> = (input) => {
    if (loading) return;
    createAccountMutate({
      variables: {
        input,
      },
      onCompleted: ({ createAccount: { ok, error } }) => {
        if (ok) {
          router.push('/auth/login');
        }
        if (error) setCreateAccountError(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-2 p-2'>
      <AuthInput
        label='Email'
        name='email'
        type='text'
        register={register('email', {
          required: true,
          pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        })}
      />
      <>
        <AuthErrorMessage inView={errors.email?.type === 'required'} message='Email is Required' />
        <AuthErrorMessage inView={errors.email?.type === 'pattern'} message='This is not email pattern' />
      </>
      <AuthInput
        label='Username'
        name='username'
        type='text'
        register={register('username', {
          required: true,
          minLength: 3,
          maxLength: 15,
        })}
      />
      <>
        <AuthErrorMessage inView={errors.username?.type === 'required'} message='Username is Required' />
        <AuthErrorMessage
          inView={errors.username?.type === 'minLength' || errors.username?.type === 'maxLength'}
          message='Minimum 3 characters or more and maximum 15 characters or less'
        />
      </>
      <AuthInput
        label='Password'
        name='password'
        type='password'
        register={register('password', {
          required: true,
          minLength: 8,
          maxLength: 20,
        })}
      />
      <>
        <AuthErrorMessage inView={errors.password?.type === 'required'} message='Password is Required' />
        <AuthErrorMessage
          inView={errors.password?.type === 'minLength' || errors.password?.type === 'maxLength'}
          message='Minimum 8 characters or more and maximum 20 characters or less'
        />
      </>
      <AuthSubmitButton isValid={isValid} payload='Create Account' loading={loading} />
      <AuthErrorMessage inView={!!createAccountError} message={createAccountError} />
    </form>
  );
};

CretaeAccount.getLayout = function getLayout(page: ReactElement) {
  return <LoggedOutLayout title='Create Account'>{page}</LoggedOutLayout>;
};

export const getServerSideProps: GetServerSideProps = withSsrSession(async ({ req }) => {
  if (req.session.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
});

export default CretaeAccount;

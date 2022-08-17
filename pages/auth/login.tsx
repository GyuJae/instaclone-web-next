import { useLogin } from '@apollo/mutations/login.mutation';
import AuthErrorMessage from '@components/AuthErrorMessage';
import AuthInput from '@components/AuthInput';
import AuthSubmitButton from '@components/AuthSubmitButton';
import Layout from '@components/Layout'
import { logInUser } from '@libs/apolloVar';
import { useRouter } from 'next/router';
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app'

interface IForm {
  email: string;
  password: string
}

const Login: NextPageWithLayout = () => {
  const rounter = useRouter()
  const { loginMutate, loading } = useLogin()
  
  const { register, handleSubmit, formState: { isValid, errors } } = useForm<IForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IForm> = (input) => {
    loginMutate({
      variables: {
        input    
      },
      onCompleted: ({login: {ok, token}}) => {
        if (ok && token) {
          logInUser(token)
          rounter.replace('/')
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-2 p-2'>
      <AuthInput
        label='Email'
        name='email'
        type='text'
        register={register('email', {
          required: true,
          pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        })}
      />
      <>
        <AuthErrorMessage inView={errors.email?.type === 'required'} message='Email is Required' />
        <AuthErrorMessage inView={errors.email?.type === 'pattern'} message='This is not email pattern' />
      </>
      <AuthInput
        label='Password'
        name='password'
        type='password'
        register={register('password', {
          required: true,
          minLength: 8
        })}
      />
      <>
        <AuthErrorMessage inView={errors.password?.type === 'required'} message='Password is Required' />
        <AuthErrorMessage
          inView={errors.password?.type === 'minLength' || errors.password?.type === 'maxLength'}
          message='Minimum 8 characters or more and maximum 20 characters or less'
        />
      </>
      <AuthSubmitButton isValid={isValid} payload='Log In' loading={loading} />
    </form>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Login

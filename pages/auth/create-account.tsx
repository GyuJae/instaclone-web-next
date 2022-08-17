import AuthErrorMessage from '@components/AuthErrorMessage';
import AuthInput from '@components/AuthInput';
import AuthSubmitButton from '@components/AuthSubmitButton';
import Layout from '@components/Layout'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NextPageWithLayout } from '../_app'

interface IForm {
  email: string;
  username: string;
  password: string;
}

const CretaeAccount: NextPageWithLayout = () => {
  const { register, handleSubmit, formState: { isValid, errors } } = useForm<IForm>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IForm> = (input) => {
    console.log(input)
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
        label='Username'
        name='username'
        type='text'
        register={register('username', {
          required: true,
          minLength: 3,
          maxLength: 15
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
          maxLength: 20
        })}
      />
      <>
        <AuthErrorMessage inView={errors.password?.type === 'required'} message='Password is Required' />
        <AuthErrorMessage
          inView={errors.password?.type === 'minLength' || errors.password?.type === 'maxLength'}
          message='Minimum 8 characters or more and maximum 20 characters or less'
        />
      </>
      <AuthSubmitButton isValid={isValid} payload='Create Account'/>
    </form>
  )
}

CretaeAccount.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default CretaeAccount

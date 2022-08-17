import AuthInput from '@components/AuthInput';
import AuthSubmitButton from '@components/AuthSubmitButton';
import Layout from '@components/Layout'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { NextPageWithLayout } from '../_app'

interface IForm {
  email: string;
  password: string
}

const Login: NextPageWithLayout = () => {
  const { register, handleSubmit, formState: { isValid } } = useForm<IForm>({
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
      <AuthInput
        label='Password'
        name='password'
        type='password'
        register={register('password', {
          required: true,
          minLength: 8
        })}
      />
      <AuthSubmitButton isValid={isValid} payload='Log In'/>
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

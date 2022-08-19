import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IForm {
  keyword: string
}

const SearchInput = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IForm>()
  const onSubmit: SubmitHandler<IForm> = ({ keyword }) => {
    router.push({
      pathname: '/search',
      query: {keyword}
    })
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
      <input
        className=' rounded-sm bg-gray-100 p-2'
        autoComplete='off'
        placeholder='Search'
        {...register('keyword', { required: true })}
      />
    </form>
  )
}

export default SearchInput
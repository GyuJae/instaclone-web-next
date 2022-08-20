import React from 'react';
import { cls } from '@libs/index';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateComment } from '@apollo/mutations/createComment.mutation';

interface IForm {
  payload: string
}

interface IProps {
  postId: number
}

const CommentForm: React.FC<IProps> = ({postId}) => {
  const { register, handleSubmit, formState: {isValid}, setValue } = useForm<IForm>({
    mode: 'onChange'
  })

  const { createCommentMutate, loading} = useCreateComment()

  const onSubmit: SubmitHandler<IForm> = ({payload}) => {
    if (loading) return;
    createCommentMutate({
      variables: {
        input: {
          payload,
          postId
        }
      },
      onCompleted: (data) => {
        if (data.createComment.ok) {
          setValue('payload', '')
        }
      }
    })
  }

  return (
    <form className='flex border-t-[1.5px] px-2 pt-1' onSubmit={handleSubmit(onSubmit)}>
      <input className='w-full focus:outline-none' placeholder='Write a comment' autoComplete='off' {...register('payload', {required: true})} />
      <button type='submit' disabled={!isValid} className={cls("text-blue-500 font-semibold", isValid ? "" : "brightness-150")}>Post</button>
    </form>
  )
}

export default CommentForm
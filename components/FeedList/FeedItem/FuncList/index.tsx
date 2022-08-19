import React from 'react'
import Comment from './Comment'
import Liked from './Liked'
import Message from './Message'

const FuncList = () => {
  return (
    <div className='space-x-3 px-2 pb-0 pt-2'>
      <Liked isLiked={false} />
      <Comment />
      <Message />
    </div>
  )
}

export default FuncList
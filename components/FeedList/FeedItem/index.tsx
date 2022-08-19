import { ISeeFeedPost } from '@apollo/queries/seeFeed.query'
import React from 'react'
import FeedHeader from './FeedHeader'
import Files from './Files'

interface IProps {
  post: ISeeFeedPost
}

const Feeditem: React.FC<IProps> = ({post}) => {
  return (
    <div className='rounded-sm border-[1px] py-2'>
      <FeedHeader user={post.user} />
      <Files files={post.files} />
    </div>
  )
}

export default Feeditem
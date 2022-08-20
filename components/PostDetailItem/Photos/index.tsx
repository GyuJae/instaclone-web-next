import { ISeeFeedPost } from '@apollo/queries/seeFeed.query';
import Files from '@components/FeedList/FeedItem/Files';
import React from 'react'

interface IProps {
  post: ISeeFeedPost;
}

const Photos:React.FC<IProps> = ({post}) => {  
  
  return (
    <div className='w-96'>
      <Files files={post.files} isDetail />
    </div>
  )
}

export default Photos
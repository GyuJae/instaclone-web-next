import { ISeeFeedPost } from '@apollo/queries/seeFeed.query'
import React from 'react'
import Caption from './Caption'
import Comment from './Comment'
import Count from './Count'
import FeedHeader from './FeedHeader'
import Files from './Files'
import FuncList from './FuncList'

interface IProps {
  post: ISeeFeedPost
}

const Feeditem: React.FC<IProps> = ({post}) => {
  return (
    <div className='rounded-md border-[1.5px] py-2'>
      <FeedHeader user={post.user} />
      <Files files={post.files} />
      <FuncList postId={post.id} isLiked={post.isLiked} />
      <Count likeCount={post.likeCount} commentCount={post.commentCount} />
      <Caption caption={post.caption} username={post.user.username} postId={post.id} />
      <Comment />
    </div>
  )
}

export default Feeditem
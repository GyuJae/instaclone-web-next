import { ISeeFeedPost } from '@apollo/queries/seeFeed.query'
import CommentForm from '@components/CommentForm'
import React from 'react'
import Caption from './Caption'
import CommentCount from './CommentCount'
import FeedHeader from './FeedHeader'
import Files from './Files'
import FuncList from './FuncList'
import LikeCount from './LikeCount'

interface IProps {
  post: ISeeFeedPost
}

const Feeditem: React.FC<IProps> = ({post}) => {
  return (
    <div className='rounded-md border-[1.5px] py-2'>
      <FeedHeader user={post.user} />
      <Files files={post.files} />
      <FuncList postId={post.id} isLiked={post.isLiked} />
      <LikeCount likeCount={post.likeCount} commentCount={post.commentCount} />
      <Caption caption={post.caption} username={post.user.username} postId={post.id} />
      <CommentCount postId={post.id} commentCount={post.commentCount} />
      <CommentForm postId={post.id} />
    </div>
  )
}

export default Feeditem
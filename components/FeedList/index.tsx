import { useSeeFeed } from '@apollo/queries/seeFeed.query'
import React, { useMemo } from 'react'
import Feeditem from './FeedItem'
import NotFound from './NotFound'

const FeedList = () => {
  const { posts } = useSeeFeed()
  
  const feedList = useMemo(() => { 
    if(!posts) return <NotFound />
    return posts.map((post,index) => {
      const key = `feed-${post.id}-${index}`
      return <Feeditem key={key} post={post} />
    })
  }, [posts])

  return (
    <div className='space-y-2'>{feedList}</div>
  )
}

export default FeedList
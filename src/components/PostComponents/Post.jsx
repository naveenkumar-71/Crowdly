import React from 'react'
import PostHeader from './PostHeader'
import PostFooterFeed from './PostFooterFeed'

function Post({ post }) {
  if (!post) return null;

  return (
    <div className='mx-19'>
      <PostHeader image={post.userAvatar} username={post.username}/>
      <img className="w-full h-[600px] object-cover" src={post.image} alt={post.caption}></img>
      <PostFooterFeed 
        likes={post.likes} 
        likesCount={post.likesCount}  
        commentsCount={post.commentsCount}
        caption={post.caption}
        username={post.username}
        timestamp={post.timestamp}
      />
    </div>
  )
}

export default Post
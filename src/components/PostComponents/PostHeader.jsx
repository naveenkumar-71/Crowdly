import React from 'react'

function PostHeader(props) {
  return (
    <div className='flex gap-3 items-center p-2'>
     <img src={props.image} className='w-8 h-8 rounded-full'/>
     <p className='font-semibold'>{props.username}</p>
    </div>
  )
}

export default PostHeader
import React from 'react'

function StoryCarousal(props) {
  return (
    <div className=' flex flex-col items-center gap-1 cursor-pointer shrink-0'>
    {/* <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"> */}
      <img src={props.img} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-gray-900"/>
    <p className="text-xs text-center w-16"> {props.username}</p></div>
    // </div>
  )
}

export default StoryCarousal
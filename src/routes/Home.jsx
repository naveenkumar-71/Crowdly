import React from 'react'
import LeftPanel from '../components/LeftpannelComponents/LeftPanel'
import StoryCarousal from '../components/StoryComponents/StoryCarousel'
import profile from "../assets/profile_img.jpg"
import Feed from '../components/Feed'
import Story from '../components/StoryComponents/Story'


function Home() {
  // const username="yanka"
  
  return (
    <div className="h-screen w-screen flex gap-10 bg-white text-black overflow-auto">
      <LeftPanel/>
     <div className="ml-[260px] px-[400px] flex justify-center">
      <div className="w-full max-w-[630px] pt-1 ">
        <Story/>
        <Feed/>
      </div>
     </div>
    </div>
  )
}

export default Home
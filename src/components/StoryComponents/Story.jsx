import React from 'react'
import StoryCarousel from './StoryCarousel'
import profile from "../../assets/profile_img.jpg"

function Story() {
 const username="yanka"
  return (
    <div
    className="flex  gap-5 overflow-x-auto hide-scrollbar py-3 ">
    <StoryCarousel username={username} img={profile} />
    <StoryCarousel username={username} img={profile}/>
    <StoryCarousel username={username} img={profile}/>
    <StoryCarousel username={username} img={profile}/>
    <StoryCarousel username={username} img={profile}/>
    <StoryCarousel username={username} img={profile}/>
    <StoryCarousel username={username} img={profile}/>
    <StoryCarousel username={username} img={profile}/>
    <StoryCarousel username={username} img={profile}/>
    <StoryCarousel username={username} img={profile}/>
</div>
  )
}

export default Story
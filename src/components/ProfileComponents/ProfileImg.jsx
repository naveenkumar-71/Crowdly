import React from 'react'

const ProfileImg = (props) => {

  return (
   <img src={props.img} className={`rounded-full object-cover ${props.size}`}></img>
  )
}

export default ProfileImg
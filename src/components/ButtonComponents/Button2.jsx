import React from 'react'

function Button2(props) {
  return (
    <div>
        <button className={`${props.bgcolor} w-[250px] text-black p-2 rounded-xl`}>{props.text}</button>
        
    </div>
  )
}

export default Button2
import React from 'react'



function SideMenuOptions(props) {
  return (
    <div className='hover:bg-gray-200 flex gap-6 items-center mx-2 rounded-sm px-1 cursor-pointer w-[200px] px-4 py-2'>
    <button className='text-2xl cursor-pointer'>{props.icon}</button>
    <button onClick={props.onClick} className=' rounded-lg  text-center cursor-pointer'>{props.text}</button>
    {/* <image src={props.icon}/> */}
     </div>
  )
}

export default SideMenuOptions
import React, { useState } from 'react'

function DOB(props) {


    const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  const currentYear=new Date().getFullYear()


  return (
    <div className='flex gap-6 w-[350px] w-full justify-center text-gray-500'>

        <select className='bg-white h-11 border px-9  border-gray-400 rounded-lg px-2 bg-[#fafafa]  outline-none' value={props.date} onChange={(e)=>{props.setDate(e.target.value)}}>
            
            
            <option >Date</option>
             {Array.from({length:31},(_,i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
             ))}
        </select>

        <select className='bg-white h-11 border px-10  border-gray-400 rounded-lg px-2 bg-[#fafafa]  outline-none' value={props.month} onChange={(e)=>{props.setMonth(e.target.value)}}> 
            <option>Month</option>
            {months.map((month, i) => ( 
                <option key={month} value={i + 1}>{month}</option>//month as number not string
            ))}
        </select>

        <select className='bg-white h-11 border px-9  border-gray-400 rounded-lg px-2 bg-[#fafafa]  outline-none' value={props.year} onChange={(e)=>{props.setYear(e.target.value)}}> 
            <option>Year</option>
            {Array.from({length:87},(_,i) =>{
                return(
                <option key={currentYear-i} value={currentYear-i}>{currentYear-i}</option> )
            })}
        </select>

    </div>
  )
}

export default DOB
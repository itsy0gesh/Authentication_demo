import React from 'react';
import {useSelector} from "react-redux"

function Home() {
  const username= useSelector((state)=>state.navbar.username);
  return (
    <div className='flex-1 flex justify-center items-center'>
      {username ? username : "home"}
    </div>
  )
}

export default Home

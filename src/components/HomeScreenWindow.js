import React from 'react';
import homescreenimage from "../images/homescreen_window.png";

function HomeScreenWindow() {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center">
        <img src={homescreenimage} alt="homescreen"/>
        <p className="text-poppins text-2xl text-white pb-5">ChatFuse WebApp</p>
        <p className="w-[70%] text-stone-400">Our all-in-one chat app allows you to send messages, make video and voice calls, share photos and files, and prioritize your security and privacy.</p>
    </div>
  )
}

export default HomeScreenWindow
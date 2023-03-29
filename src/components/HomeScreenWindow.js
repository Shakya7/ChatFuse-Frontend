import React from 'react';
import homescreenimage from "../images/homescreen_window.png";
import { useSelector } from 'react-redux';

function HomeScreenWindow() {
  const theme=useSelector((state)=>state.settings.darkMode);
  return (
    <div className="flex flex-col justify-center items-center h-full overflow-y-auto text-center">
        <img src={homescreenimage} alt="homescreen"/>
        <p className={`text-poppins text-2xl ${theme?"text-white":"text-black"} pb-5`}>ChatFuse WebApp</p>
        <p className={`w-[70%] ${theme?"text-stone-400":"text-stone-600"}`}>Our all-in-one chat app allows you to send messages, make video and voice calls, share photos and files, and prioritize your security and privacy.</p>
    </div>
  )
}
export default HomeScreenWindow
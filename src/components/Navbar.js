import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMessage, faUserGroup, faPhone, faGear, faRightFromBracket, faSun, faMoon} from "@fortawesome/free-solid-svg-icons";
import { changeTheme } from "../redux/features/settings/settingSlice";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";

function Navbar(props) {

  const theme=useSelector((state)=>state.settings.darkMode);
  const dispatch=useDispatch();
  const navigation=useNavigate();

  const [selected, setSelected]=useState("");

  useEffect(()=>{
    //if(window.location.pathname="/" || window.location.pathname="/chat")
    if(window.location.pathname.includes("channel"))
      setSelected("channel")

    else if(window.location.pathname.includes("profile"))
      setSelected("profile")
    else if(window.location.pathname.includes("call"))
      setSelected("call")
    else if(window.location.pathname.includes("settings"))
      setSelected("settings")
    else if(window.location.pathname.includes("/") || window.location.pathname.includes("chat") || window.location.pathname.includes("mobile-chat"))
      setSelected("chat")
    
  },[selected])

  return (
    <div className={`${theme?"bg-[#16141b]":"bg-stone-100"} ${props.wdth} border border-transparent ${theme?"border-r-stone-700":"border-r-stone-300"} h-full overflow-y-auto flex flex-col items-center`}>
      <img className="mb-3.5" src={logo} alt="logo"/>
      <div className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] rounded-full bg-red-300 transition-colors ease-in-out delay-150 cursor-pointer hover:bg-red-500"/>
      <div className={`border w-[70%] border-transparent ${theme?"border-b-stone-700":"border-b-stone-300"} flex flex-col text-xl mt-10 text-stone-600 transition-colors ease-in-out delay-150`}>
        <FontAwesomeIcon onClick={()=>navigation("/")} className={`mb-4 ${selected==="chat"?"text-sky-500":""} cursor-pointer hover:text-sky-500`} icon={faMessage}/>
        <FontAwesomeIcon onClick={()=>navigation("/channel")} className={`mb-6 cursor-pointer ${selected==="channel"?"text-sky-500":""} hover:text-sky-500`} icon={faUserGroup}/>
      </div>
      <div className={`border w-[70%] border-transparent ${theme?"border-b-stone-700":"border-b-stone-300"} flex flex-col text-xl mt-6`}>
        <FontAwesomeIcon className={`mb-6 text-stone-600 cursor-pointer transition-colors ease-in-out delay-150 hover:text-sky-500 ${selected==="call"?"text-sky-500":""}`} icon={faPhone}/>
      </div>
      <FontAwesomeIcon className={`text-xl mt-6 mb-4 transition-colors ease-in-out delay-150 text-stone-600 hover:text-sky-500 cursor-pointer ${selected==="settings"?"text-sky-500":""}`} icon={faGear}/>
      <FontAwesomeIcon className="text-red-500 text-xl transition-colors ease-in-out delay-150 hover:text-red-700 cursor-pointer" icon={faRightFromBracket}/>

      <div onClick={
        ()=>dispatch(changeTheme())
      } className={`min-w-5 p-1 min-h-[3.5rem] h-auto ${theme?"bg-[#29252e]":"bg-sky-600"} rounded-full mt-auto mb-6 flex flex-col justify-between cursor-pointer`}>
        <div className={`flex rounded-full p-1 justify-center items-center ${!theme?"bg-white":""}`}><FontAwesomeIcon className={`${!theme?"text-sky-500":"text-white"} text-sm`} icon={faSun}/></div>
        <div className={`flex rounded-full p-1 justify-center items-center ${theme?"bg-[#16141b]":""}`}><FontAwesomeIcon className={`${theme?"text-violet-500":"text-white"} text-sm`} icon={faMoon}/></div>
      </div>
    </div>  
  )
}

export default Navbar
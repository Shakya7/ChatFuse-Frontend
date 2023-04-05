import React, { useEffect, useState } from 'react';
import logo from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMessage, faUserGroup, faPhone, faGear, faRightFromBracket, faSun, faMoon, faPeopleGroup} from "@fortawesome/free-solid-svg-icons";
import { changeTheme } from "../redux/features/settings/settingSlice";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { setSection } from '../redux/features/app_state/appStateSlice';
import {logout} from "../redux/features/login/loginSlice";
import { resetData } from '../redux/features/profile/profileSlice';
import ReactLoading from "react-loading";
import { socket } from '../socketClient';
import ModalContainer from './ModalContainer';
import FriendModal from './friends/FriendModal';

function Navbar(props) {

  const theme=useSelector((state)=>state.settings.darkMode);
  const dispatch=useDispatch();
  const navigation=useNavigate();
  const section=useSelector((state)=>state.app_state.current_section);
  const isLoading=useSelector((state)=>state.login_state.isLogoutLoading);

  //const [selected, setSelected]=useState("");

  const [friendsSection, setFriendsSection]=useState(false);

  useEffect(()=>{
    //if(window.location.pathname="/" || window.location.pathname="/chat")
    if(window.location.pathname.includes("channel"))
      dispatch(setSection("channel"));
    else if(window.location.pathname.includes("profile"))
      dispatch(setSection("profile"));
    else if(window.location.pathname.includes("call"))
      dispatch(setSection("call"))
    else if(window.location.pathname.includes("settings"))
      dispatch(setSection("settings"))
    else if(window.location.pathname.includes("/") || window.location.pathname.includes("chat"))
      dispatch(setSection("chat"))
    
  },[])

  return (
    <div className={`${theme?"bg-[#16141b]":"bg-stone-100"} ${props.wdth} scrollbar-none border border-transparent ${theme?"border-r-stone-700":"border-r-stone-300"} h-full overflow-y-auto flex flex-col items-center`}>
      <img className="mb-3.5" src={logo} alt="logo"/>
      <div onClick={()=>{
        dispatch(setSection("profile"));
        navigation("/profile")
        }} className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] rounded-full bg-red-300 transition-colors ease-in-out delay-150 cursor-pointer hover:bg-red-500"/>
      <div className={`border w-[70%] border-transparent ${theme?"border-b-stone-700":"border-b-stone-300"} flex flex-col text-xl mt-10 transition-colors ease-in-out delay-150`}>
        <FontAwesomeIcon onClick={()=>{
           setFriendsSection(true);
        }} className={`mb-4 text-stone-600 cursor-pointer hover:text-sky-500`} icon={faPeopleGroup}/>
        <FontAwesomeIcon onClick={()=>{
          dispatch(setSection("chat"));
          navigation("/")
          }} className={`mb-4 ${section==="chat"?"text-sky-500":"text-stone-600"} cursor-pointer hover:text-sky-500`} icon={faMessage}/>
        <FontAwesomeIcon onClick={()=>{
          dispatch(setSection("channel"));
          navigation("/channel")
          }} className={`mb-6 cursor-pointer ${section==="channel"?"text-sky-500":"text-stone-600"} hover:text-sky-500`} icon={faUserGroup}/>
      </div>
      <div className={`border w-[70%] border-transparent ${theme?"border-b-stone-700":"border-b-stone-300"} flex flex-col text-xl mt-6`}>
        <FontAwesomeIcon onClick={()=>{
          dispatch(setSection("call"));
        }} className={`mb-6 text-stone-600 cursor-pointer transition-colors ease-in-out delay-150 hover:text-sky-500 ${section==="call"?"text-sky-500":""}`} icon={faPhone}/>
      </div>
      <FontAwesomeIcon onClick={()=>{
        dispatch(setSection("settings"));
      }} className={`text-xl mt-6 mb-4 transition-colors ease-in-out delay-150 text-stone-600 hover:text-sky-500 cursor-pointer ${section==="settings"?"text-sky-500":""}`} icon={faGear}/>
      {isLoading?<ReactLoading width={"35%"} height={"35%"} type="spin" color="#14B8A6"/>:<FontAwesomeIcon onClick={()=>{
        dispatch(logout());
        dispatch(resetData());
      }} className="text-red-500 text-xl transition-colors ease-in-out delay-150 hover:text-red-700 cursor-pointer" icon={faRightFromBracket}/>}

      <div onClick={
        ()=>dispatch(changeTheme())
      } className={`min-w-5 p-1 min-h-[3.5rem] h-auto ${theme?"bg-[#29252e]":"bg-sky-600"} rounded-full mt-auto mb-6 flex flex-col justify-between cursor-pointer`}>
        <div className={`flex rounded-full p-1 justify-center items-center ${!theme?"bg-white":""}`}><FontAwesomeIcon className={`${!theme?"text-sky-500":"text-white"} text-sm`} icon={faSun}/></div>
        <div className={`flex rounded-full p-1 justify-center items-center ${theme?"bg-[#16141b]":""}`}><FontAwesomeIcon className={`${theme?"text-violet-500":"text-white"} text-sm`} icon={faMoon}/></div>
      </div>
      {friendsSection && <ModalContainer><FriendModal closeModal={setFriendsSection}/></ModalContainer>}
    </div>  
  )
}

export default Navbar
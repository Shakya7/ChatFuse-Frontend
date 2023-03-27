import React from 'react';
import logo from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMessage, faUserGroup, faPhone, faGear, faRightFromBracket, faSun, faMoon} from "@fortawesome/free-solid-svg-icons"

function Navbar() {
  return (
    <div className="bg-[#16141b] basis-1/6 border border-transparent border-r-stone-700 overflow-hidden flex flex-col items-center">
      <img className="mb-3.5" src={logo} alt="logo"/>
      <div className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] rounded-full bg-red-300"/>
      <div className="border w-[70%] border-transparent border-b-stone-700 flex flex-col text-xl mt-10 text-stone-600">
        <FontAwesomeIcon className="mb-4 text-sky-500" icon={faMessage}/>
        <FontAwesomeIcon className="mb-6" icon={faUserGroup}/>
      </div>
      <div className="border w-[70%] border-transparent border-b-stone-700 flex flex-col text-xl mt-6">
        <FontAwesomeIcon className="mb-6 text-stone-600" icon={faPhone}/>
      </div>
      <FontAwesomeIcon className="text-xl mt-6 mb-4 text-stone-600" icon={faGear}/>
      <FontAwesomeIcon className="text-red-500 text-xl" icon={faRightFromBracket}/>

      <div className="min-w-5 p-1 min-h-[3.5rem] h-auto  bg-[#29252e] rounded-full mt-auto mb-6 flex flex-col justify-between">
        <div className="flex rounded-full p-1 justify-center items-center"><FontAwesomeIcon className="text-white text-sm" icon={faSun}/></div>
        <div className="flex rounded-full p-1 justify-center items-center bg-[#16141b]"><FontAwesomeIcon className="text-sky-500 text-sm" icon={faMoon}/></div>
      </div>
    </div>  
  )
}

export default Navbar
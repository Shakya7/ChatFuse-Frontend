import {useEffect, useState, useContext} from 'react';
import { ScreenWidth } from '../App';
import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane, faMicrophone, faFile } from '@fortawesome/free-solid-svg-icons';

import dark_theme_1 from "../images/dark_theme_main_wallpaper.jpg";
import dark_theme_2 from "../images/dark_theme_dflt_wallpaper.jpg";
import light_theme_1 from "../images/light_theme_main_wallpaper.jpg";


function ChatWindow() {
    const screenWidth=useContext(ScreenWidth);
    const theme=useSelector((state)=>state.settings.darkMode); 
    const navigate=useNavigate();
    useEffect(()=>{
        const path = window.location.pathname;
        const match=path.match(/mobile-chat\/(\d+)/);
        const conversationID=match?match[1]:""
        if(screenWidth>"640" && path===`/mobile-chat/${conversationID}`){
            console.log("Hello okay lets see if its working")
            navigate(`/chat/${conversationID}`);
        }
    },[screenWidth])

    return (
        <div className="flex flex-col h-screen" style={{backgroundImage:`url(${theme?dark_theme_1:light_theme_1})`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
            <div className="h-[90%] overflow-y-auto"></div>
            <footer className="h-[10%] flex items-center px-4 pb-5 gap-4">
                <div className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] bg-red-300 rounded-full"/>
                <div className={`w-full flex justify-between items-center py-3 px-3 rounded-lg border border-sky-500 ${theme?"bg-[#29252e]":"bg-white"}`}>
                    <div className="flex w-full items-center">
                        <div className="px-3 flex items-center">
                            <FontAwesomeIcon className="text-stone-500 cursor-pointer" icon={faPaperclip}/>
                        </div>
                        <div className="w-full flex items-center">
                            <input placeholder="Type Something..." className={`w-full bg-transparent outline-none px-3 pl-2 text-sm ${theme?"text-stone-300":"text-stone-800"}`} type="text"/>
                            <div className="flex text-sky-500 w-auto items-center gap-1">
                                <FontAwesomeIcon icon={faFile}/>
                                <p className="w-full">2</p>
                            </div>
                            <div className="px-4">
                                <FontAwesomeIcon className="text-stone-500 cursor-pointer" icon={faMicrophone}/>
                            </div>
                        </div>
                    </div>
                    <div className={`border border-transparent ${theme?"border-l-stone-700":"border-l-stone-300"} px-4`}>  
                        <FontAwesomeIcon className="text-sky-500 cursor-pointer" icon={faPaperPlane}/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default ChatWindow
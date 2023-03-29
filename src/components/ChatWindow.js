import {useEffect, useState, useContext} from 'react';
import { ScreenWidth } from '../App';
import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatSendFooter from './ChatSendFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPhone, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ChatWindowHeader from './ChatWindowHeader';

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
            <div className="h-[90%] flex pb-6 flex-col overflow-y-auto">
                <ChatWindowHeader/>
                <div className={`mt-[2rem] px-4 ${theme?"text-stone-300":"text-stone-800"}`}>
                    hello
                </div>
            </div>
            <ChatSendFooter/>
        </div>
    )
}

export default ChatWindow
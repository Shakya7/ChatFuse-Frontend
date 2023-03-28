import {useEffect, useState, useContext} from 'react';
import { ScreenWidth } from '../App';
import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
        <div className="flex h-screen" style={{backgroundImage:`url(${theme?dark_theme_1:light_theme_1})`,backgroundSize:"cover"}}>
        {
            
        }
        </div>
    )
}

export default ChatWindow
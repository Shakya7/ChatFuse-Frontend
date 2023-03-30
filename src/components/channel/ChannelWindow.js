import {useEffect, useState, useContext} from 'react';
import { ScreenWidth } from '../../App';
import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatSendFooter from './../chat/ChatSendFooter';
import ChatWindowHeader from './../chat/ChatWindowHeader';

function ChannelWindow() {
    const screenWidth=useContext(ScreenWidth);
    const theme=useSelector((state)=>state.settings.darkMode); 
    const navigate=useNavigate();

    useEffect(()=>{
        const path = window.location.pathname;
        const match=path.match(/mobile-channel\/(\d+)/);
        const channelID=match?match[1]:""
        if(screenWidth>"640" && path===`/mobile-channel/${channelID}`){
            console.log("Hello okay lets see if its working")
            navigate(`/channel/${channelID}`);
        }
    },[screenWidth])

    return (
        <div className={`${theme?"bg-[#313238]":"bg-white"} flex flex-col h-screen`}>
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

export default ChannelWindow
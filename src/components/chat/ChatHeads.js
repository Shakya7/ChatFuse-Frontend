import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ScreenWidth } from '../../App';
import { useContext, useEffect } from 'react';

function ChatHeads(props) {
    const navigate=useNavigate();
    const theme=useSelector((state)=>state.settings.darkMode);
    const screenWidth=useContext(ScreenWidth);

    useEffect(()=>{
        const path = window.location.pathname;
        if(screenWidth<="640" && path==`/chat/${props.id}`)
            navigate(`/mobile-chat/${props.id}`)
    },[screenWidth]);
    return (
        <div onClick={()=>{
            const path = window.location.pathname;
            if(screenWidth<="640")
                navigate(`/mobile-chat/${props.id}`)
            else
                navigate(`/chat/${props.id}`);
        }} className={`mt-2 flex justify-between px-5 py-3 items-center w-full text-sm cursor-pointer ${theme?"hover:bg-[#16141b]":"hover:bg-white"}`}>
            <div className="flex justify-start items-center w-4/5 gap-2 overflow-hidden">
                <div className="w-10 relative min-w-[2.5rem] h-10 min-h-[2.5rem] rounded-full bg-red-300">
                    <div className="absolute w-[10px] h-[10px] rounded-full bg-green-700 bottom-0 right-0"/>
                </div>
                <div className="w-full overflow-hidden">
                    <p className={`${theme?"text-white":"text-black"}`}>{props.name}</p>
                    <p className={`text-ellipsis whitespace-nowrap overflow-hidden ${theme?"text-stone-400":"text-stone-600"}`}>{props.message}</p>
                </div>
            </div>
            {props.section==="chat"?<div className="w-1/5 text-right">
                <div className={`${theme?"text-stone-400":"text-stone-600"}`}>13:23pm</div>
                <FontAwesomeIcon className={`${theme?"text-green-400":"text-green-600"}`} icon={faCheckDouble}/>
            </div>:""}
        </div>
    )
}

export default ChatHeads
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function ChatHeads(props) {
    const theme=useSelector((state)=>state.settings.darkMode);
    return (
        <div className="mt-6 flex justify-between items-center w-full text-sm cursor-pointer">
            <div className="flex justify-start items-center w-4/5 gap-2 overflow-hidden">
                <div className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] rounded-full bg-red-300"/>
                <div className="w-full overflow-hidden">
                    <p className={`${theme?"text-white":"text-black"}`}>{props.name}</p>
                    <p className={`text-ellipsis whitespace-nowrap overflow-hidden ${theme?"text-stone-400":"text-stone-600"}`}>{props.message}</p>
                </div>
            </div>
            <div className="w-1/5 text-right">
                <div className={`${theme?"text-stone-400":"text-stone-600"}`}>13:23pm</div>
                <FontAwesomeIcon className={`${theme?"text-green-400":"text-green-600"}`} icon={faCheckDouble}/>
            </div>
        </div>
    )
}

export default ChatHeads
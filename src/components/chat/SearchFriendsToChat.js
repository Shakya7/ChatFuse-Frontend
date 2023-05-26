import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setSection } from "../../redux/features/app_state/appStateSlice";
import { useEffect, useRef } from "react";
import ChatHeads from "./ChatHeads";

function SearchFriendsToChat() {
    const dispatch=useDispatch();
    const theme=useSelector((state)=>state.settings.darkMode);
    const friends=useSelector((state)=>state.friend.friends);
    const inputRef=useRef(null);
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    return (
        <div className={`${theme?"bg-[#29252e]":"bg-stone-200"} flex flex-col basis-5/6 h-full ${theme?"text-white":"text-black"}`}>
            <header className={`${theme?"bg-[#16141b]":"bg-stone-100"} ${theme?"text-stone-400":"text-black"} min-h-[13%] flex items-center justify-left gap-10`}>
                <FontAwesomeIcon onClick={()=>dispatch(setSection("chat"))} className="pl-5 cursor-pointer" icon={faArrowLeft}/>
                <p>New Chat</p>
            </header>
            <div className={`${theme?"bg-[#1d1923]":"bg-white"} mt-2.5 rounded-lg mx-2.5 py-2 flex justify-between items-center`}>
                <input ref={inputRef} placeholder='Search friends' className={`bg-transparent pl-2 outline-0 text-sm ${theme?"text-white":"text-black"} w-[85%] placeholder:text-stone-700`}/>
                <FontAwesomeIcon className="text-stone-700 pr-2" icon={faMagnifyingGlass}/>
            </div>
            <div className={`flex cursor-pointer justify-start mt-2.5 p-4 items-center gap-4 ${theme?"hover:bg-[#16141b]":"hover:bg-white"}`}>
                <div className={`w-12 relative min-w-[2.5rem] h-12 min-h-[2.5rem] rounded-full flex justify-center items-center ${theme?"bg-gray-600":"bg-stone-400"}`}>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
                <p>New Group</p>
            </div>
            <div className={`overflow-y-scroll h-full scrollbar-thin ${theme?"scrollbar-thumb-stone-600":"scrollbar-thumb-stone-400"}`}>
            {
                friends &&
                friends.map(friend=><ChatHeads section="friends-chat" key={friend.id} id={friend.id} name={friend.name}/>)
            }
            </div>
            
        </div>
    )
}

export default SearchFriendsToChat
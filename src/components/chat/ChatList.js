import React, { useEffect } from 'react'
import ChatHeads from './ChatHeads';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setSection } from '../../redux/features/app_state/appStateSlice';
import { getUserConversations } from '../../redux/features/chat/chatSlice';


function ChatList() {
  const theme=useSelector((state)=>state.settings.darkMode);
  const dispatch=useDispatch();
  const conversations=useSelector((state)=>state.chat.conversations);
  const currentUser=useSelector((state)=>state.login_state.userID);
  const isLoading=useSelector((state)=>state.chat.isLoading);

  // Fetch conversations on component mount
  useEffect(()=>{
    dispatch(getUserConversations());
  },[dispatch])

  // Sort conversations so that the most recent sender/receiver message is stacked on top
  const sortedConversations = React.useMemo(() => {
    if (!conversations) return [];
    return [...conversations].sort((a, b) => {
      const timeA = a.latestMessage?.createdAt 
        ? new Date(a.latestMessage.createdAt).getTime() 
        : new Date(a.updatedAt || a.createdAt || 0).getTime();
      const timeB = b.latestMessage?.createdAt 
        ? new Date(b.latestMessage.createdAt).getTime() 
        : new Date(b.updatedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  }, [conversations]);

  return (
        <div className={`${theme?"bg-[#29252e]":"bg-stone-200"} basis-5/6 h-full overflow-y-auto scrollbar-thin ${theme?"scrollbar-thumb-stone-600":"scrollbar-thumb-stone-400"}`}>
            <div className="">
                <div className={`h-16 mx-5 border border-transparent ${theme?"border-b-stone-700":"border-b-stone-300"}`}>
                
                </div>
                <div className="flex flex-col mx-5 mt-4">
                    <div className="flex justify-between items-baseline">
                        <div className="flex flex-col xmd:flex-row gap-3 items-baseline font-nunito">
                            <p className={`text-2xl ${theme?"text-white":"text-black"}`}>Messages</p>
                            <b className="text-teal-500">{conversations?.length || 0} Chats</b>
                        </div>
                        <FontAwesomeIcon onClick={()=>{
                            dispatch(setSection("search-friends-to-chat"));
                            }} className="text-teal-500 text-lg cursor-pointer" icon={faPenToSquare}/>
                    </div>
                    <div className={`${theme?"bg-[#1d1923]":"bg-white"} mt-2.5 rounded-lg py-2 flex justify-between items-center`}>
                        <input placeholder='Search anything' className={`bg-transparent pl-2 outline-0 text-sm ${theme?"text-white":"text-black"} w-[75%] placeholder:text-stone-700`}/>
                        <FontAwesomeIcon className="text-stone-700 pr-2" icon={faMagnifyingGlass}/>
                    </div>
                </div>
                <section className="mt-5 pb-5">
                {
                    isLoading?(
                        <div className="flex justify-center items-center p-5">
                            <p className={theme?"text-stone-400":"text-stone-600"}>Loading conversations...</p>
                        </div>
                    ):sortedConversations && sortedConversations.length>0?(
                        sortedConversations.map((conversation)=>{
                            // Get the other user in the conversation
                            const otherUser=conversation.users.find((user)=>user._id!==currentUser);
                            const lastMessagePreview=conversation.latestMessage?.content || "No messages yet";
                            const lastMessageTime=conversation.latestMessage?.createdAt?new Date(conversation.latestMessage.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}):"";
                            
                            return (
                                <ChatHeads 
                                    section="chat" 
                                    key={conversation._id} 
                                    id={conversation._id} 
                                    message={lastMessagePreview} 
                                    isGroup={conversation.groupChat} 
                                    name={otherUser?.name || "User"} 
                                    status={otherUser?.status || "Offline"}
                                />
                            )
                        })
                    ):(
                        <div className="flex justify-center items-center p-5">
                            <p className={theme?"text-stone-400":"text-stone-600"}>No conversations yet. Start by sending a friend request!</p>
                        </div>
                    )
                }
                </section>
            </div>
            
        </div>
  )
}

export default ChatList
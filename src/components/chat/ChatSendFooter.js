import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane, faMicrophone, faFile } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { sendMessage, setIsTyping, getOrCreateConversation, addConversationToList } from '../../redux/features/chat/chatSlice';
import { socket } from '../../socketClient';
import { useNavigate } from 'react-router-dom';

function ChatSendFooter() {
    
    const theme=useSelector((state)=>state.settings.darkMode);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isSendingMessage=useSelector((state)=>state.chat.isSendingMessage);
    const currentConversation=useSelector((state)=>state.chat.currentConversation);
    const selectedConversation=useSelector((state)=>state.chat.selectedConversation);
    const currentUser=useSelector((state)=>state.login_state.userID);
    
    const [messageInput, setMessageInput]=useState("");
    const typingTimeoutRef=useRef(null);

    // Handle typing indicator
    const handleTyping=(e)=>{
        setMessageInput(e.target.value);

        // Clear previous timeout
        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }

        // Get the other user in the conversation
        if(currentConversation?.users){
            const otherUser=currentConversation.users.find((user)=>user._id!==currentUser);
            
            if(otherUser && selectedConversation && !String(selectedConversation).startsWith("temp-")){
                // Emit typing event (only for real conversations)
                socket.emit("typing",{
                    conversationId:selectedConversation,
                    recipientId:otherUser._id
                });

                // Set timeout to stop typing indicator after 3 seconds of inactivity
                typingTimeoutRef.current=setTimeout(()=>{
                    socket.emit("stop-typing",{
                        conversationId:selectedConversation,
                        recipientId:otherUser._id
                    });
                },3000);
            }
        }
    }

    // Handle send message
    const handleSendMessage=async(e)=>{
        e.preventDefault();
        
        if(!messageInput.trim() || !selectedConversation || isSendingMessage){
            return;
        }

        try{
            let realConversationId = selectedConversation;
            let otherUser = currentConversation?.users?.find((user)=>user._id!==currentUser);
            let realConvData = null; // holds the real conversation when coming from a temp chat

            // If this is a temporary conversation, persist it to the backend first
            if(String(selectedConversation).startsWith("temp-")){
                if(!otherUser) return;
                const realConv = await dispatch(getOrCreateConversation(otherUser._id)).unwrap();
                realConvData = realConv;
                realConversationId = realConv._id;
                otherUser = realConv.users?.find((user)=>user._id!==currentUser);
                // Update the URL to reflect the real conversation ID
                navigate(`/chat/${realConversationId}`, { replace: true, state: { chatName: otherUser?.name, isGroup: false } });
            }

            // Send message via Redux thunk and get the message object
            const sentMessage = await dispatch(sendMessage({
                conversationId: realConversationId,
                content: messageInput
            })).unwrap();

            // If this was the very first message in a new conversation,
            // now add it to ChatList (only after the message is confirmed sent)
            if(realConvData){
                dispatch(addConversationToList({ ...realConvData, latestMessage: sentMessage }));
            }

            // Emit full message via socket to recipient
            if(otherUser && sentMessage){
                socket.emit("send-message",{
                    conversationId: realConversationId,
                    recipientId: otherUser._id,
                    message: sentMessage
                });
            }

            // Clear input
            setMessageInput("");

            // Stop typing indicator (only relevant for pre-existing conversations)
            if(otherUser && !String(selectedConversation).startsWith("temp-")){
                socket.emit("stop-typing",{
                    conversationId: realConversationId,
                    recipientId: otherUser._id
                });
            }
        }catch(err){
            console.error("Error sending message:",err);
        }
    }

    return (
        <footer className="h-[10%] flex items-center px-4 pb-5 gap-4">
            <div className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] bg-red-300 rounded-full"/>
            <form onSubmit={handleSendMessage} className={`w-full flex justify-between items-center py-3 px-3 rounded-lg border border-sky-500 ${theme?"bg-[#29252e]":"bg-white"}`}>
                <div className="flex w-full items-center">
                    <div className="px-3 flex items-center">
                        <FontAwesomeIcon className="text-stone-500 cursor-pointer" icon={faPaperclip}/>
                    </div>
                    <div className="w-full flex items-center">
                        <input 
                            placeholder="Type Something..." 
                            value={messageInput}
                            onChange={handleTyping}
                            disabled={isSendingMessage}
                            className={`w-full bg-transparent outline-none px-3 pl-2 text-sm ${theme?"text-stone-300":"text-stone-800"} disabled:opacity-50`} 
                            type="text"
                        />
                        <div className="flex text-sky-500 w-auto items-center gap-1">
                            <FontAwesomeIcon icon={faFile}/>
                            <p className="w-full">2</p>
                        </div>
                        <div className="px-4">
                            <FontAwesomeIcon className="text-stone-500 cursor-pointer" icon={faMicrophone}/>
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={isSendingMessage || !messageInput.trim()} className={`border border-transparent ${theme?"border-l-stone-700":"border-l-stone-300"} px-4 ${isSendingMessage?"opacity-50 cursor-not-allowed":"cursor-pointer"}`}>  
                    <FontAwesomeIcon className="text-sky-500" icon={faPaperPlane}/>
                </button>
            </form>
        </footer>
    )
}

export default ChatSendFooter
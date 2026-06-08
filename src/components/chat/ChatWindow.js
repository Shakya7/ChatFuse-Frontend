import { useEffect, useState, useContext, useRef, useMemo } from 'react';
import { ScreenWidth } from '../../App';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ChatSendFooter from './ChatSendFooter';
import ChatWindowHeader from './ChatWindowHeader';
import { getMessages, getConversation, setSelectedConversation, clearChat } from '../../redux/features/chat/chatSlice';
import { socket } from '../../socketClient';

import dark_theme_1 from "../../images/dark_theme_main_wallpaper.jpg";
import dark_theme_2 from "../../images/dark_theme_dflt_wallpaper.jpg";
import light_theme_1 from "../../images/light_theme_main_wallpaper.jpg";


function ChatWindow() {
    const screenWidth = useContext(ScreenWidth);
    const theme = useSelector((state) => state.settings.darkMode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const isLoading = useSelector((state) => state.chat.isLoading);
    const currentConversation = useSelector((state) => state.chat.currentConversation);
    const loginID = useSelector((state) => state.login_state.userID);
    const comicMode = useSelector((state) => state.settings.comicMode);
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);

    // Extract conversationID from URL
    const conversationID = useMemo(() => {
        const path = window.location.pathname;
        const match = path.match(/chat\/([a-f0-9]+)/);
        return match ? match[1] : "";
    }, [window.location.pathname]);

    useEffect(() => {
        const path = window.location.pathname;
        const match = path.match(/mobile-chat\/(\d+)/);
        const convID = match ? match[1] : ""
        if (screenWidth > "640" && path === `/mobile-chat/${convID}`) {
            console.log("Hello okay lets see if its working")
            navigate(`/chat/${convID}`);
        }
    }, [screenWidth, navigate])

    // Load conversation details and messages when conversation ID changes
    useEffect(() => {
        if (conversationID) {
            console.log("Loading conversation and messages for:", conversationID);
            dispatch(setSelectedConversation(conversationID));
            // Fetch both conversation details (with other user info) and messages
            dispatch(getConversation(conversationID));
            dispatch(getMessages(conversationID));
        }
    }, [conversationID, dispatch])

    // Clear chat when leaving the component (real-time only when viewing)
    useEffect(() => {
        return () => {
            console.log("Clearing chat state - leaving chat view");
            dispatch(clearChat());
        }
    }, [dispatch])

    // Smooth scroll to bottom when new messages arrive
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 0);
        }
    }, [messages.length])

    return (
        <div className="flex flex-col h-screen" style={{
            backgroundImage: comicMode ? "none" : `url(${theme ? dark_theme_1 : light_theme_1})`,
            backgroundColor: comicMode ? "#ffffff" : "transparent",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}>
            {/* Comic mode SVG filter for hand-drawn border effect */}
            {comicMode && (
                <svg width="0" height="0" style={{ position: "absolute" }}>
                    <defs>
                        <filter id="comic-wobble" x="-10%" y="-10%" width="120%" height="120%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="4" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </defs>
                </svg>
            )}
            <div ref={scrollContainerRef} className="h-[90%] flex pb-6 flex-col overflow-y-auto scrollbar-hide">
                <ChatWindowHeader />
                <div className={`mt-[2rem] px-4 flex flex-col gap-4 ${theme ? "text-stone-300" : "text-stone-800"}`}>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <p>Loading messages...</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex justify-center items-center h-32">
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isSender = msg.sender._id === loginID;
                            return (
                                <div key={msg._id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                                    {comicMode ? (
                                        // ── COMIC / HAND-DRAWN BUBBLE ──
                                        <div style={{
    fontFamily: "'Caveat', cursive",
    fontSize: "1.15rem",
    fontWeight: 500,
    background: isSender ? "#ddeeff" : "#ffffff",
    border: `2.5px solid ${isSender ? "#1a6fd4" : "#1a1a1a"}`,
    borderRadius: isSender
        ? "22px 22px 4px 22px"
        : "22px 22px 22px 4px",
    padding: "10px 18px",
    position: "relative",
    color: isSender ? "#0d3d7a" : "#111111",
    filter: "url(#comic-wobble)",
    maxWidth: "18rem",
}}>
    {!isSender && (
        <p style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: "2px", fontFamily: "'Caveat', cursive" }}>
            {msg.sender.name}
        </p>
    )}
    <p style={{ wordBreak: "break-word", lineHeight: 1.3 }}>{msg.content}</p>
    <p style={{ fontSize: "0.72rem", marginTop: "4px", opacity: 0.55, textAlign: "right" }}>
        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </p>
</div>
                                    ) : (
                                        // ── REGULAR BUBBLE ──
                                        <div className={`max-w-xs px-4 py-2 rounded-lg ${isSender ? "bg-teal-600 text-white" : "bg-gray-600 text-gray-100"}`}>
                                            {!isSender && <p className="text-xs font-semibold mb-1">{msg.sender.name}</p>}
                                            <p className="break-words">{msg.content}</p>
                                            <p className={`text-xs mt-1 ${isSender ? "text-teal-100" : "text-gray-400"}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <ChatSendFooter />
        </div>
    )
}

export default ChatWindow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ScreenWidth } from '../../App';
import { useContext, useEffect } from 'react';
import { setSelectedConversation, createTemporaryConversation, clearUnreadCount } from '../../redux/features/chat/chatSlice';
import { setSection } from '../../redux/features/app_state/appStateSlice';

function ChatHeads(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.settings.darkMode);
    const screenWidth = useContext(ScreenWidth);
    const conversations = useSelector((state) => state.chat.conversations);
    const profileID = useSelector((state) => state.login_state.userID);
    const { name: currentUserName } = useSelector((state) => state.profile_state);
    const unreadCounts = useSelector((state) => state.chat.unreadCounts);

    // Unread count for this specific conversation
    const unreadCount = unreadCounts?.[props.id] || 0;
    const badgeLabel = unreadCount > 99 ? "99+" : unreadCount;

    useEffect(() => {
        const path = window.location.pathname;
        if (screenWidth <= "640" && path === `/chat/${props.id}`)
            navigate(`/mobile-chat/${props.id}`);
    }, [screenWidth]);

    const handleChatClick = async () => {
        // Always clear the unread badge when the user opens this chat
        dispatch(clearUnreadCount(props.id));

        if (props.section === "friends-chat") {
            // Check if there is already an existing 1:1 conversation with this friend
            const existingConv = conversations?.find(
                (c) => !c.groupChat && c.users.some((u) => u._id === props.id)
            );

            if (existingConv) {
                dispatch(clearUnreadCount(existingConv._id));
                dispatch(setSelectedConversation(existingConv._id));
                dispatch(setSection("chat"));
                if (screenWidth <= "640")
                    navigate(`/mobile-chat/${existingConv._id}`, { state: { chatName: props.name, isGroup: props.isGroup } });
                else
                    navigate(`/chat/${existingConv._id}`, { state: { chatName: props.name, isGroup: props.isGroup } });
            } else {
                // Initialize temporary conversation (not persisted yet)
                dispatch(createTemporaryConversation({
                    friend: { _id: props.id, name: props.name, status: props.status || "Offline" },
                    currentUser: { id: profileID, name: currentUserName }
                }));
                dispatch(setSection("chat"));
                if (screenWidth <= "640")
                    navigate(`/mobile-chat/temp-${props.id}`, { state: { chatName: props.name, isGroup: props.isGroup } });
                else
                    navigate(`/chat/temp-${props.id}`, { state: { chatName: props.name, isGroup: props.isGroup } });
            }
        } else {
            // Regular chat navigation (both 1:1 and group from ChatList)
            dispatch(setSelectedConversation(props.id));
            if (screenWidth <= "640")
                navigate(`/mobile-chat/${props.id}`, { state: { chatName: props.name, isGroup: props.isGroup } });
            else
                navigate(`/chat/${props.id}`, { state: { chatName: props.name, isGroup: props.isGroup } });
        }
    };

    return (
        <div
            onClick={handleChatClick}
            className={`mt-2 flex justify-between px-5 py-3 items-center w-full text-sm cursor-pointer transition-colors ${theme ? "hover:bg-[#16141b]" : "hover:bg-white"}`}
        >
            {/* Avatar + name + last message */}
            <div className="flex justify-start items-center w-4/5 gap-2 overflow-hidden">
                <div className="w-10 relative min-w-[2.5rem] h-10 min-h-[2.5rem] rounded-full bg-red-300">
                    <div className={`absolute w-[10px] h-[10px] rounded-full ${props.status === "Online" ? "bg-green-500" : "bg-gray-500"} bottom-0 right-0 border-2 ${theme ? "border-[#29252e]" : "border-stone-200"}`} />
                </div>
                <div className="w-full overflow-hidden">
                    <p className={`leading-tight ${unreadCount ? "font-bold" : "font-semibold"} ${theme ? "text-white" : "text-black"}`}>{props.name}</p>
                    <p className={`text-ellipsis whitespace-nowrap overflow-hidden text-xs mt-0.5 ${unreadCount ? "font-bold" : ""} ${theme ? "text-stone-400" : "text-stone-500"}`}>
                        {props.message}
                    </p>
                </div>
            </div>

            {/* Right: unread badge OR double-tick */}
            {props.section === "chat" && (
                <div className="w-1/5 flex flex-col items-end gap-1 flex-shrink-0">
                    {unreadCount > 0 ? (
                        <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-teal-500 text-white text-[11px] font-bold flex items-center justify-center shadow-md shadow-teal-500/30">
                            {badgeLabel}
                        </span>
                    ) : (
                        <FontAwesomeIcon
                            className={`text-xs ${theme ? "text-green-400" : "text-green-600"}`}
                            icon={faCheckDouble}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default ChatHeads;
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPhone,
  faSearch,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ModalContainer from "../ModalContainer";
import GroupSettingsModal from "./GroupSettingsModal";

function ChatWindowHeader() {
  const theme = useSelector((state) => state.settings.darkMode);
  const navigate = useNavigate();
  const { state } = useLocation();
  const currentConversation = useSelector((state) => state.chat.currentConversation);
  const currentUser = useSelector((state) => state.login_state.userID);
  const [showSettings, setShowSettings] = useState(false);

  // Fallback to Redux store values if location state is null (e.g. on direct link, refresh)
  let chatName = state?.chatName;
  let isGroup = state?.isGroup;

  if (currentConversation) {
    if (currentConversation.groupChat) {
      chatName = currentConversation.chatName || "Group Chat";
      isGroup = true;
    } else {
      const otherUser = currentConversation.users?.find((user) => user._id !== currentUser);
      chatName = otherUser?.name || "User";
      isGroup = false;
    }
  }

  return (
    <header className="h-16 flex items-center backdrop-blur-lg w-full fixed px-4 relative">
      <div className="flex gap-3 items-center">
        <FontAwesomeIcon
          className={`${
            theme ? "text-stone-300" : "text-stone-800"
          } cursor-pointer`}
          onClick={() => {
            if(window.location.pathname.includes("chat"))
                navigate("/");
            else if(window.location.pathname.includes("channel"))
                navigate("/channel");
        }}
          icon={faArrowLeft}
        />
        <div className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] bg-red-300 rounded-full" />
        <div 
          className={`${theme ? "text-stone-300" : "text-stone-800"} ${isGroup ? "cursor-pointer hover:opacity-80" : ""}`}
          onClick={() => isGroup && setShowSettings(true)}
        >
          <p className="font-semibold">{chatName || "Loading..."}</p>
          {isGroup && <p className="text-xs text-stone-500">{currentConversation?.users?.length || 0} Members</p>} 
        </div>
      </div>
      <div
        className={`flex gap-3 absolute right-5 ${
          theme ? "text-stone-400" : "text-stone-600"
        }`}
      >
        <FontAwesomeIcon icon={faPhone} />
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>

      {showSettings && isGroup && (
        <ModalContainer>
          <GroupSettingsModal closeModal={() => setShowSettings(false)} />
        </ModalContainer>
      )}
    </header>
  );
}

export default ChatWindowHeader;

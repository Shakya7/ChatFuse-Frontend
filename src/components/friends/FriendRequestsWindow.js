import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faUserPlus, 
    faUserCheck, 
    faCheck, 
    faXmark, 
    faMagnifyingGlass, 
    faUserGroup, 
    faEnvelope, 
    faClock,
    faMessage
} from "@fortawesome/free-solid-svg-icons";
import { getFriends, clearSearchedUser, getAcceptedFriends, getUsersWhoSentRequests, getFriendRequestedUsers } from "../../redux/features/friend/friendSlice";
import { getOrCreateConversation, createTemporaryConversation, setSelectedConversation } from "../../redux/features/chat/chatSlice";
import { setSection } from "../../redux/features/app_state/appStateSlice";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socketClient";
import ReactLoading from "react-loading";

function LoadingComponent() {
    const theme = useSelector((state) => state.settings.darkMode);
    return (
        <div className={`animate-pulse rounded-lg p-3 ${theme ? "bg-stone-800" : "bg-stone-300"} flex flex-col gap-2`}>
            <div className={`${theme ? "bg-stone-700" : "bg-stone-400"} w-[50%] h-4 rounded`} />
            <div className={`${theme ? "bg-stone-700" : "bg-stone-400"} w-[70%] h-3 rounded`} />
        </div>
    );
}

function FriendRequestsWindow() {
    const theme = useSelector((state) => state.settings.darkMode);
    const comicMode = useSelector((state) => state.settings.comicMode);
    const profileID = useSelector((state) => state.login_state.userID);
    const { name } = useSelector((state) => state.profile_state);
    const conversations = useSelector((state) => state.chat.conversations);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { 
        isSearchingUsers, 
        searchedUsers, 
        friendRequestsFromUsers, 
        friendRequestedUsers, 
        friends 
    } = useSelector((state) => state.friend);

    const [activeTab, setActiveTab] = useState("all-friends"); // "all-friends", "pending-requests", "add-friend"
    const [searchTerm, setSearchTerm] = useState("");
    const [clear, setClear] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        if (profileID) {
            dispatch(getAcceptedFriends(profileID));
            dispatch(getUsersWhoSentRequests(profileID));
            dispatch(getFriendRequestedUsers(profileID));
        }
        return () => {
            dispatch(clearSearchedUser());
        };
    }, [dispatch, profileID]);

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        if (searchTerm.includes("@")) {
            dispatch(getFriends({ type: "email", searchFriendTerm: searchTerm, profileID }));
        } else {
            dispatch(getFriends({ type: "name", searchFriendTerm: searchTerm, profileID }));
        }
        setClear(false);
    };

    const handleClear = () => {
        setSearchTerm("");
        if (inputRef.current) inputRef.current.value = "";
        dispatch(clearSearchedUser());
        setClear(true);
    };

    const handleStartChat = async (friend) => {
        // Find if there is an existing conversation in state
        const existingConv = conversations?.find(
            (c) => !c.groupChat && c.users.some((user) => user._id === friend._id)
        );

        if (existingConv) {
            dispatch(setSelectedConversation(existingConv._id));
            dispatch(setSection("chat"));
            navigate(`/chat/${existingConv._id}`, { state: { chatName: friend.name, isGroup: false } });
        } else {
            // Create a temporary conversation in Redux (not persisted on backend yet)
            dispatch(createTemporaryConversation({
                friend,
                currentUser: { id: profileID, name: name }
            }));
            dispatch(setSection("chat"));
            navigate(`/chat/temp-${friend._id}`, { state: { chatName: friend.name, isGroup: false } });
        }
    };

    // Style Helpers based on Theme & Comic Mode
    const fontStyle = comicMode ? { fontFamily: "'Caveat', cursive" } : {};
    const borderStyle = comicMode ? "border-2 border-black rounded-[15px] filter-[url(#comic-wobble)] shadow-[3px_3px_0px_#000]" : "border border-stone-300 dark:border-stone-700 rounded-xl";
    const headerStyle = comicMode ? "font-bold text-4xl" : "text-3xl font-nunito font-semibold";
    const textStyle = comicMode ? "text-xl" : "text-sm";

    return (
        <div className={`w-full h-screen p-6 overflow-y-auto scrollbar-thin ${
            theme ? "bg-[#313238] text-stone-300" : comicMode ? "bg-white text-stone-900" : "bg-stone-200 text-stone-800"
        }`} style={fontStyle}>
            
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

            {/* Header Area */}
            <div className="flex justify-between items-center mb-8 border-b pb-4 border-stone-300 dark:border-stone-700">
                <div>
                    <h1 className={headerStyle}>Friends Dashboard</h1>
                    <p className={comicMode ? "text-lg" : "text-sm text-stone-500 dark:text-stone-400 font-nunito"}>
                        Manage your friends, pending requests, and connect with new users.
                    </p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex mb-6 border-b border-stone-300 dark:border-stone-700 pb-2">
                <button 
                    onClick={() => setActiveTab("all-friends")}
                    className={`flex-1 text-center px-2 py-2 font-semibold transition-all ${
                        activeTab === "all-friends" 
                            ? comicMode ? "border-b-4 border-black text-black" : "border-b-2 border-sky-500 text-sky-500" 
                            : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                    }`}
                >
                    <FontAwesomeIcon icon={faUserGroup} className="mr-2" />
                    All Friends ({friends?.length || 0})
                </button>
                <button 
                    onClick={() => setActiveTab("pending-requests")}
                    className={`flex-1 text-center px-2 py-2 font-semibold transition-all relative ${
                        activeTab === "pending-requests" 
                            ? comicMode ? "border-b-4 border-black text-black" : "border-b-2 border-sky-500 text-sky-500" 
                            : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                    }`}
                >
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    Pending Requests ({friendRequestsFromUsers?.length || 0})
                    {friendRequestsFromUsers?.length > 0 && (
                        <span className="ml-1 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                            {friendRequestsFromUsers.length}
                        </span>
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab("add-friend")}
                    className={`flex-1 text-center px-2 py-2 font-semibold transition-all ${
                        activeTab === "add-friend" 
                            ? comicMode ? "border-b-4 border-black text-black" : "border-b-2 border-sky-500 text-sky-500" 
                            : "text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                    }`}
                >
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Add Friend
                </button>
            </div>

            {/* Active Tab Content */}
            <div className="w-full">
                
                {/* 1. ALL FRIENDS TAB */}
                {activeTab === "all-friends" && (
                    <div className="flex flex-wrap gap-4">
                        {friends && friends.length > 0 ? (
                            friends.map((friend) => (
                                <div 
                                    key={friend._id} 
                                    className={`flex-1 min-w-[280px] min-[1200px]:max-w-[380px] p-4 flex items-center gap-4 ${
                                        theme ? "bg-stone-800" : comicMode ? "bg-[#fdfdfd]" : "bg-white"
                                    } ${borderStyle}`}
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-12 h-12 rounded-full bg-red-300 flex-shrink-0 relative">
                                            <div className={`absolute w-[12px] h-[12px] rounded-full border-2 border-white dark:border-stone-800 ${
                                                friend.status === "Online" ? "bg-green-600" : "bg-gray-500"
                                            } bottom-0 right-0`} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className={`font-semibold text-ellipsis overflow-hidden whitespace-nowrap ${comicMode ? "text-2xl" : "text-base"}`}>{friend.name}</p>
                                            <p className={`text-stone-500 dark:text-stone-400 text-ellipsis overflow-hidden whitespace-nowrap ${comicMode ? "text-lg" : "text-xs"}`}>{friend.email}</p>
                                            <p className={`text-xs ${friend.status === "Online" ? "text-green-600" : "text-stone-400"}`}>{friend.status}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleStartChat(friend)}
                                        title="Send Message"
                                        className={`flex-shrink-0 px-3 py-2 rounded-lg transition-all ${
                                            comicMode 
                                                ? "border-2 border-black bg-sky-200 hover:bg-sky-300 shadow-[2px_2px_0px_#000]" 
                                                : "bg-sky-100 hover:bg-sky-200 text-sky-600 dark:bg-stone-700 dark:hover:bg-stone-600 dark:text-sky-400"
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faMessage} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <FontAwesomeIcon icon={faUserGroup} className="text-stone-400 text-5xl mb-3" />
                                <p className={comicMode ? "text-2xl" : "text-stone-500 dark:text-stone-400"}>You don't have any friends yet.</p>
                                <button 
                                    onClick={() => setActiveTab("add-friend")}
                                    className={`mt-4 px-4 py-2 font-bold ${
                                        comicMode ? "border-2 border-black bg-yellow-200 hover:bg-yellow-300 shadow-[3px_3px_0px_#000]" : "bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                                    }`}
                                >
                                    Find Friends
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 2. PENDING REQUESTS TAB */}
                {activeTab === "pending-requests" && (
                    <div className="flex flex-col gap-4 max-w-2xl">
                        {friendRequestsFromUsers && friendRequestsFromUsers.length > 0 ? (
                            friendRequestsFromUsers.map((request) => (
                                <div 
                                    key={request._id} 
                                    className={`p-4 flex justify-between items-center ${
                                        theme ? "bg-stone-800" : comicMode ? "bg-[#fdfdfd]" : "bg-white"
                                    } ${borderStyle}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-red-300 flex-shrink-0" />
                                        <div>
                                            <p className={`font-semibold ${comicMode ? "text-2xl" : "text-base"}`}>{request.sender.name}</p>
                                            <p className={`text-stone-500 dark:text-stone-400 ${comicMode ? "text-lg" : "text-xs"}`}>{request.sender.email}</p>
                                            <span className="text-[10px] px-2 py-0.5 bg-sky-100 dark:bg-stone-700 text-sky-600 dark:text-sky-400 rounded-full">
                                                Incoming Request
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => socket.emit("accept-friend-request", { sender: request.sender._id, profileID })}
                                            className={`px-4 py-2 font-semibold flex items-center gap-2 transition-all ${
                                                comicMode 
                                                    ? "border-2 border-black bg-green-200 hover:bg-green-300 shadow-[2px_2px_0px_#000]" 
                                                    : "bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                                            }`}
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                            Accept
                                        </button>
                                        <button 
                                            onClick={() => socket.emit("decline-friend-request", { sender: request.sender._id, profileID, name })}
                                            className={`px-4 py-2 font-semibold flex items-center gap-2 transition-all ${
                                                comicMode 
                                                    ? "border-2 border-black bg-red-200 hover:bg-red-300 shadow-[2px_2px_0px_#000]" 
                                                    : "bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                                            }`}
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <FontAwesomeIcon icon={faEnvelope} className="text-stone-400 text-5xl mb-3" />
                                <p className={comicMode ? "text-2xl" : "text-stone-500 dark:text-stone-400"}>No pending friend requests.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* 3. ADD FRIEND TAB */}
                {activeTab === "add-friend" && (
                    <div className="max-w-xl">
                        {/* Search Input */}
                        <div className="flex gap-2 mb-6">
                            <div className={`flex items-center w-full px-3 py-2 ${
                                theme ? "bg-stone-800" : "bg-white"
                            } ${borderStyle}`}>
                                <input 
                                    ref={inputRef} 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    placeholder="Search by name or email" 
                                    className="bg-transparent w-full outline-none text-sm placeholder:text-stone-500"
                                />
                                <FontAwesomeIcon 
                                    onClick={handleSearch} 
                                    className="text-stone-500 cursor-pointer hover:text-sky-500 ml-2" 
                                    icon={faMagnifyingGlass} 
                                />
                            </div>
                            <button 
                                onClick={handleClear}
                                className={`px-4 py-2 font-bold transition-all ${
                                    comicMode 
                                        ? "border-2 border-black bg-red-200 hover:bg-red-300 shadow-[2px_2px_0px_#000]" 
                                        : "bg-stone-500 text-white rounded-lg hover:bg-stone-600 text-sm"
                                }`}
                            >
                                Clear
                            </button>
                        </div>

                        {/* Search Results */}
                        <div className="flex flex-col gap-3">
                            {isSearchingUsers ? (
                                <div className="flex flex-col gap-2">
                                    <LoadingComponent />
                                    <LoadingComponent />
                                </div>
                            ) : searchedUsers && searchedUsers.length > 0 ? (
                                searchedUsers.map((user) => {
                                    // Check if request is already sent
                                    const requestSent = friendRequestedUsers.some(
                                        (req) => req.receiver._id === user._id
                                    );

                                    return (
                                        <div 
                                            key={user._id} 
                                            className={`p-4 flex justify-between items-center ${
                                                theme ? "bg-stone-800" : comicMode ? "bg-[#fdfdfd]" : "bg-white"
                                            } ${borderStyle}`}
                                        >
                                            <div>
                                                <p className={`font-semibold ${comicMode ? "text-2xl" : "text-base"}`}>{user.name}</p>
                                                <p className={`text-stone-500 dark:text-stone-400 ${comicMode ? "text-lg" : "text-xs"}`}>{user.email}</p>
                                            </div>
                                            <div>
                                                {requestSent ? (
                                                    <span className={`px-3 py-1.5 flex items-center gap-1.5 font-semibold ${
                                                        comicMode ? "text-green-600 text-lg" : "text-green-600 text-sm"
                                                    }`}>
                                                        <FontAwesomeIcon icon={faUserCheck} />
                                                        Sent
                                                    </span>
                                                ) : (
                                                    <button 
                                                        onClick={() => socket.emit("send-friend-request", { receiver: user._id, sender: profileID })}
                                                        className={`px-4 py-2 font-semibold flex items-center gap-2 transition-all ${
                                                            comicMode 
                                                                ? "border-2 border-black bg-sky-200 hover:bg-sky-300 shadow-[2px_2px_0px_#000]" 
                                                                : "bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm"
                                                        }`}
                                                    >
                                                        <FontAwesomeIcon icon={faUserPlus} />
                                                        Add Friend
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : !clear ? (
                                <p className={comicMode ? "text-xl text-stone-500" : "text-sm text-stone-500 dark:text-stone-400"}>
                                    No users found or already a friend.
                                </p>
                            ) : null}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default FriendRequestsWindow;

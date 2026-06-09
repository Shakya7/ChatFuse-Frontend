import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { addMembersToGroup, leaveGroup } from '../../redux/features/chat/chatSlice';
import { useNavigate } from 'react-router-dom';

function GroupSettingsModal({ closeModal }) {
    const theme = useSelector((state) => state.settings.darkMode);
    const friends = useSelector((state) => state.friend.friends);
    const currentConversation = useSelector((state) => state.chat.currentConversation);
    const loginID = useSelector((state) => state.login_state.userID);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    if (!currentConversation) return null;

    // Get IDs of users currently in the group to filter them out of the friend list
    const currentMemberIds = currentConversation.users?.map(u => u._id) || [];
    const isCurrentUserAdmin = currentConversation.groupAdmin?.includes(loginID);

    // Friends eligible to be added (not already in the group)
    const addableFriends = friends?.filter(f => !currentMemberIds.includes(f._id)) || [];

    const handleFriendToggle = (friendId) => {
        if (selectedFriends.includes(friendId)) {
            setSelectedFriends(selectedFriends.filter(id => id !== friendId));
        } else {
            setSelectedFriends([...selectedFriends, friendId]);
        }
    };

    const handleAddMembers = async (e) => {
        e.preventDefault();
        if (selectedFriends.length === 0) return;

        try {
            setIsLoading(true);
            setError("");
            setSuccessMsg("");
            
            await dispatch(addMembersToGroup({ 
                conversationId: currentConversation._id, 
                memberIds: selectedFriends 
            })).unwrap();

            setSuccessMsg("Members added successfully!");
            setSelectedFriends([]);
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            console.error("Add members error:", err);
            setError(err || "Failed to add members");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLeaveGroup = async () => {
        if (window.confirm("Are you sure you want to leave this group?")) {
            try {
                setIsLoading(true);
                setError("");
                await dispatch(leaveGroup(currentConversation._id)).unwrap();
                closeModal();
                // Navigate to home — "/chat" is not a valid route, only "/chat/:id" is
                navigate("/");
            } catch (err) {
                console.error("Leave group error:", err);
                setError(err || "Failed to leave group");
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={`w-[95%] sm:w-[500px] max-h-[85vh] ${theme ? "bg-stone-700 text-white border-stone-600" : "bg-white text-stone-800 border-stone-200"} border rounded-xl flex flex-col p-6 shadow-2xl relative gap-4`}>
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-stone-600">
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold font-nunito text-teal-500">Group Settings</h3>
                    <p className="text-xs opacity-60 mt-0.5">{currentConversation.chatName}</p>
                </div>
                <button 
                    onClick={closeModal} 
                    className="p-1 rounded-full hover:bg-stone-600/50 transition-colors"
                >
                    <FontAwesomeIcon className="text-lg text-stone-400 hover:text-white" icon={faXmark} />
                </button>
            </div>

            {/* Notifications */}
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-500 text-xs px-3 py-2 rounded-md">
                    {error}
                </div>
            )}
            {successMsg && (
                <div className="bg-green-500/20 border border-green-500 text-green-500 text-xs px-3 py-2 rounded-md">
                    {successMsg}
                </div>
            )}

            <div className="flex flex-col gap-4 overflow-y-auto pr-1 flex-1 scrollbar-thin">
                {/* Current Members Section */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold tracking-wide uppercase opacity-75">
                        Group Members ({currentConversation.users?.length || 0})
                    </label>
                    <div className={`flex flex-col gap-1.5 p-2 rounded-lg border max-h-[160px] overflow-y-auto scrollbar-thin ${theme ? "border-stone-600 bg-[#1d1923]" : "border-stone-200 bg-stone-50"}`}>
                        {currentConversation.users?.map((member) => {
                            const isUserAdmin = currentConversation.groupAdmin?.includes(member._id);
                            return (
                                <div key={member._id} className="flex justify-between items-center p-2 rounded-md hover:bg-stone-600/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-stone-500 flex items-center justify-center text-white text-sm font-bold">
                                            {member.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold">{member.name} {member._id === loginID && "(You)"}</span>
                                            <span className="text-xs opacity-60">{member.status || "Offline"}</span>
                                        </div>
                                    </div>
                                    {isUserAdmin && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-500 border border-teal-500/30">
                                            Admin
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Add New Members Section */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold tracking-wide uppercase opacity-75">
                        Add Friends ({selectedFriends.length} selected)
                    </label>
                    <div className={`flex flex-col gap-1.5 p-2 rounded-lg border max-h-[160px] overflow-y-auto scrollbar-thin ${theme ? "border-stone-600 bg-[#1d1923]" : "border-stone-200 bg-stone-50"}`}>
                        {addableFriends.length > 0 ? (
                            addableFriends.map((friend) => {
                                const isChecked = selectedFriends.includes(friend._id);
                                return (
                                    <div 
                                        key={friend._id}
                                        onClick={() => handleFriendToggle(friend._id)}
                                        className={`flex justify-between items-center p-2 rounded-md cursor-pointer transition-all ${isChecked ? (theme ? "bg-teal-900/30 border border-teal-500/50 text-white" : "bg-teal-50 border border-teal-200 text-teal-800") : (theme ? "hover:bg-stone-600/35 border border-transparent" : "hover:bg-stone-200/50 border border-transparent")}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white text-sm font-bold">
                                                {friend.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold">{friend.name}</span>
                                                <span className="text-xs opacity-60">{friend.email}</span>
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-md flex justify-center items-center border transition-all ${isChecked ? "bg-teal-500 border-teal-500 text-white" : (theme ? "border-stone-500" : "border-stone-400")}`}>
                                            {isChecked && <FontAwesomeIcon icon={faCheck} className="text-xs" />}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-xs text-center opacity-55 py-3">All your friends are already in this group.</p>
                        )}
                    </div>
                    {addableFriends.length > 0 && (
                        <button 
                            type="button" 
                            onClick={handleAddMembers}
                            disabled={isLoading || selectedFriends.length === 0}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/40 text-white font-semibold rounded-lg text-sm transition-all"
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                            Add Selected Friends
                        </button>
                    )}
                </div>
            </div>

            {/* Leave Group Button */}
            <div className="flex justify-between items-center pt-3 border-t border-stone-600 gap-4">
                <button 
                    type="button" 
                    onClick={handleLeaveGroup}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 border border-red-500 hover:bg-red-500/10 text-red-500 disabled:opacity-50 rounded-lg text-sm font-semibold transition-colors"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Leave Group
                </button>
                <button 
                    type="button" 
                    onClick={closeModal}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${theme ? "hover:bg-stone-600 text-stone-300" : "hover:bg-stone-200 text-stone-600"}`}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default GroupSettingsModal;

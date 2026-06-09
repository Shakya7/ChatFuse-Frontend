import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { addConversationToList, setSelectedConversation } from '../../redux/features/chat/chatSlice';
import { setSection } from '../../redux/features/app_state/appStateSlice';
import { useNavigate } from 'react-router-dom';

function CreateGroupModal({ closeModal }) {
    const theme = useSelector((state) => state.settings.darkMode);
    const friends = useSelector((state) => state.friend.friends);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState("");
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFriendToggle = (friendId) => {
        if (selectedFriends.includes(friendId)) {
            setSelectedFriends(selectedFriends.filter(id => id !== friendId));
        } else {
            setSelectedFriends([...selectedFriends, friendId]);
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        if (!groupName.trim()) {
            setError("Group name is required");
            return;
        }
        if (selectedFriends.length === 0) {
            setError("At least one friend must be added to the group");
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/create-group`,
                {
                    groupName: groupName.trim(),
                    memberIds: selectedFriends
                },
                { withCredentials: true }
            );

            if (response.data.status === "success") {
                const newConv = response.data.data.conversation;
                // Add to local conversations list
                dispatch(addConversationToList(newConv));
                // Navigate to the newly created group chat
                dispatch(setSelectedConversation(newConv._id));
                dispatch(setSection("chat"));
                navigate(`/chat/${newConv._id}`, { state: { chatName: newConv.chatName, isGroup: true } });
                closeModal();
            }
        } catch (err) {
            console.error("Create group error:", err);
            setError(err.response?.data?.message || "Failed to create group");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`w-[90%] sm:w-[500px] max-h-[85vh] ${theme ? "bg-stone-700 text-white border-stone-600" : "bg-white text-stone-800 border-stone-200"} border rounded-xl flex flex-col p-6 shadow-2xl relative gap-4`}>
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-stone-600">
                <h3 className="text-xl font-bold font-nunito text-teal-500">Create New Group</h3>
                <button 
                    onClick={closeModal} 
                    className="p-1 rounded-full hover:bg-stone-600/50 transition-colors"
                >
                    <FontAwesomeIcon className="text-lg" icon={faXmark} />
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-500 text-xs px-3 py-2 rounded-md">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleCreateGroup} className="flex flex-col gap-4 overflow-hidden">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wide uppercase opacity-75">Group Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter group name..." 
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${theme ? "bg-[#1d1923] border-stone-600 text-white focus:border-teal-500" : "bg-stone-100 border-stone-300 text-black focus:border-teal-500"}`}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1.5 flex-1 min-h-[150px] overflow-hidden">
                    <label className="text-xs font-semibold tracking-wide uppercase opacity-75">
                        Add Friends ({selectedFriends.length} selected)
                    </label>
                    
                    {/* Friends list container */}
                    <div className={`flex-1 overflow-y-auto rounded-lg border p-2 flex flex-col gap-1.5 scrollbar-thin ${theme ? "border-stone-600 bg-[#1d1923]" : "border-stone-200 bg-stone-50"}`}>
                        {friends && friends.length > 0 ? (
                            friends.map((friend) => {
                                const isChecked = selectedFriends.includes(friend._id);
                                return (
                                    <div 
                                        key={friend._id}
                                        onClick={() => handleFriendToggle(friend._id)}
                                        className={`flex justify-between items-center p-2.5 rounded-lg cursor-pointer transition-all ${isChecked ? (theme ? "bg-teal-900/30 border border-teal-500/50 text-white" : "bg-teal-50 border border-teal-200 text-teal-800") : (theme ? "hover:bg-stone-600/35 border border-transparent" : "hover:bg-stone-200/50 border border-transparent")}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-300 flex-shrink-0" />
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
                            <p className="text-xs text-center opacity-60 py-4">No friends found. You must have friends to create a group.</p>
                        )}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-3 border-t border-stone-600">
                    <button 
                        type="button" 
                        onClick={closeModal}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${theme ? "hover:bg-stone-600 text-stone-300" : "hover:bg-stone-200 text-stone-600"}`}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={isLoading || !groupName.trim() || selectedFriends.length === 0}
                        className={`px-5 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-teal-500/20 disabled:cursor-not-allowed transition-all`}
                    >
                        {isLoading ? "Creating..." : "Create Group"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateGroupModal;

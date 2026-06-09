import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const chatState = {
    conversations: [],
    messages: [],
    currentConversation: null,
    isLoading: false,
    isSendingMessage: false,
    error: "",
    isTyping: false,
    typingUsers: [],
    selectedConversation: null,
    leftGroupId: null,
    unreadCounts: {}  // { [conversationId]: number } — incremented per unseen message
};

// Get or create conversation
export const getOrCreateConversation = createAsyncThunk(
    "/chat/getOrCreateConversation",
    async (otherUserId, { rejectWithValue }) => {
        try {
            const data = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/get-or-create`,
                { otherUserId },
                { withCredentials: true }
            );
            return data.data.data.conversation;
        } catch (err) {
            console.error("Get/Create Conversation Error:", err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Send message
export const sendMessage = createAsyncThunk(
    "/chat/sendMessage",
    async ({ conversationId, content }, { rejectWithValue }) => {
        try {
            const data = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/send-message`,
                { conversationId, content },
                { withCredentials: true }
            );
            return data.data.data.message;
        } catch (err) {
            console.error("Send Message Error:", err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Get messages
export const getMessages = createAsyncThunk(
    "/chat/getMessages",
    async (conversationId, { rejectWithValue }) => {
        try {
            const data = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/get-messages/${conversationId}`,
                { withCredentials: true }
            );
            return data.data.data.messages;
        } catch (err) {
            console.error("Get Messages Error:", err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Get single conversation
export const getConversation = createAsyncThunk(
    "/chat/getConversation",
    async (conversationId, { rejectWithValue }) => {
        try {
            const data = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/get-conversation/${conversationId}`,
                { withCredentials: true }
            );
            return data.data.data.conversation;
        } catch (err) {
            console.error("Get Conversation Error:", err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Get user conversations
export const getUserConversations = createAsyncThunk(
    "/chat/getUserConversations",
    async (_, { rejectWithValue }) => {
        try {
            const data = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/get-conversations`,
                { withCredentials: true }
            );
            return data.data.data.conversations;
        } catch (err) {
            console.error("Get Conversations Error:", err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Mark message as read
export const markMessageAsRead = createAsyncThunk(
    "/chat/markMessageAsRead",
    async (messageId, { rejectWithValue }) => {
        try {
            const data = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/mark-read`,
                { messageId },
                { withCredentials: true }
            );
            return data.data.data.message;
        } catch (err) {
            console.error("Mark Read Error:", err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Silently fetch a single conversation and add it to the list ONLY if it isn't already there.
// Does NOT touch isLoading — prevents any UI refresh or scroll reset on the receiver's side.
export const silentlyFetchAndAddConversation = createAsyncThunk(
    "/chat/silentlyFetchAndAddConversation",
    async (conversationId, { getState, rejectWithValue }) => {
        const state = getState();
        const exists = state.chat.conversations.some((c) => c._id === conversationId);
        if (exists) return null; // Already in list — nothing to do
        try {
            const data = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/get-conversation/${conversationId}`,
                { withCredentials: true }
            );
            return data.data.data.conversation;
        } catch (err) {
            console.error("Silent fetch conversation error:", err.message);
            return rejectWithValue(err.message);
        }
    }
);

// Add members to group
export const addMembersToGroup = createAsyncThunk(
    "/chat/addMembersToGroup",
    async ({ conversationId, memberIds }, { rejectWithValue }) => {
        try {
            const data = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/add-members`,
                { conversationId, memberIds },
                { withCredentials: true }
            );
            return data.data.data.conversation;
        } catch (err) {
            console.error("Add Members Error:", err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Leave group
export const leaveGroup = createAsyncThunk(
    "/chat/leaveGroup",
    async (conversationId, { rejectWithValue }) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/leave-group`,
                { conversationId },
                { withCredentials: true }
            );
            return conversationId;
        } catch (err) {
            console.error("Leave Group Error:", err.response?.data?.message || err.message);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: chatState,
    reducers: {
        // Add message locally for optimistic UI update
        addMessageLocally: (state, action) => {
            state.messages.push(action.payload);
        },
        // Receive message from socket
        receiveMessage: (state, action) => {
            // Convert both to strings for safe comparison
            const selectedConvStr = String(state.selectedConversation);
            const receivedConvStr = String(action.payload.conversationId);
            
            if (selectedConvStr === receivedConvStr) {
                // Receiver is actively viewing this conversation — push message, no badge
                state.messages.push(action.payload.message);
            } else {
                // Receiver is elsewhere — increment unread badge count
                const prev = state.unreadCounts[receivedConvStr] || 0;
                state.unreadCounts[receivedConvStr] = prev + 1;
            }

            // Sync receiver's ChatList without an API call (avoids isLoading flicker)
            const convIndex = state.conversations.findIndex(
                (conv) => conv._id === action.payload.conversationId
            );
            if (convIndex !== -1) {
                state.conversations[convIndex] = {
                    ...state.conversations[convIndex],
                    latestMessage: action.payload.message,
                };
            }
        },
        // Set current/selected conversation
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },
        // Set typing status
        setIsTyping: (state, action) => {
            state.isTyping = action.payload;
        },
        // Add typing user
        addTypingUser: (state, action) => {
            if (!state.typingUsers.includes(action.payload)) {
                state.typingUsers.push(action.payload);
            }
        },
        // Remove typing user
        removeTypingUser: (state, action) => {
            state.typingUsers = state.typingUsers.filter(
                (userId) => userId !== action.payload
            );
        },
        // Clear messages
        clearMessages: (state) => {
            state.messages = [];
        },
        // Clear entire chat state (when leaving chat view)
        clearChat: (state) => {
            state.messages = [];
            state.selectedConversation = null;
            state.currentConversation = null;
            state.typingUsers = [];
            state.leftGroupId = null;
            state.unreadCounts = {};  // wipe all badge counts on full reset
        },
        // Clear unread count for a specific conversation (called when user opens it)
        clearUnreadCount: (state, action) => {
            const conversationId = String(action.payload);
            if (state.unreadCounts[conversationId]) {
                state.unreadCounts[conversationId] = 0;
            }
        },
        // Create temporary conversation locally in Redux (does NOT appear in ChatList)
        createTemporaryConversation: (state, action) => {
            const { friend, currentUser } = action.payload;
            const tempId = `temp-${friend._id}`;

            // Only set currentConversation and selectedConversation.
            // Do NOT push to state.conversations — the temp chat must NOT appear in ChatList.
            // The real conversation is added only when the first message is actually sent.
            state.selectedConversation = tempId;
            state.currentConversation = {
                _id: tempId,
                groupChat: false,
                users: [
                    { _id: currentUser.id, name: currentUser.name },
                    { _id: friend._id, name: friend.name, email: friend.email, status: friend.status || "Offline" }
                ],
                latestMessage: null,
                temp: true
            };
        },
        // Explicitly add a conversation to the ChatList (called after first message is sent)
        addConversationToList: (state, action) => {
            const exists = state.conversations.some(c => c._id === action.payload._id);
            if (!exists) {
                // Prepend so it appears at the top of the list
                state.conversations.unshift(action.payload);
            }
        },
        // Update user status locally in the conversations list and currentConversation
        updateUserStatus: (state, action) => {
            const { userId, status } = action.payload;
            state.conversations = state.conversations.map((conv) => {
                const updatedUsers = conv.users.map((u) => {
                    if (u._id === userId) {
                        return { ...u, status };
                    }
                    return u;
                });
                return { ...conv, users: updatedUsers };
            });
            if (state.currentConversation && state.currentConversation.users) {
                state.currentConversation.users = state.currentConversation.users.map((u) => {
                    if (u._id === userId) {
                        return { ...u, status };
                    }
                    return u;
                });
            }
        },
        updateConversationInList: (state, action) => {
            const index = state.conversations.findIndex(c => c._id === action.payload._id);
            if (index !== -1) {
                state.conversations[index] = {
                    ...state.conversations[index],
                    ...action.payload,
                    latestMessage: action.payload.latestMessage || state.conversations[index].latestMessage
                };
            } else {
                state.conversations.unshift(action.payload);
            }
            if (state.currentConversation && state.currentConversation._id === action.payload._id) {
                state.currentConversation = {
                    ...state.currentConversation,
                    ...action.payload
                };
            }
        },
        removeConversationFromList: (state, action) => {
            const conversationId = action.payload;
            state.conversations = state.conversations.filter(c => c._id !== conversationId);
            if (state.selectedConversation === conversationId) {
                state.selectedConversation = null;
                state.currentConversation = null;
                state.messages = [];
            }
        },
    },
    extraReducers: (builder) => {
        // Get or create conversation
        builder.addCase(getOrCreateConversation.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        });
        builder.addCase(getOrCreateConversation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentConversation = action.payload;
            state.selectedConversation = action.payload._id;
            state.error = "";
            // Do NOT add to conversations here.
            // The conversation is added to ChatList only after the first message is
            // successfully sent, via the explicit addConversationToList action.
        });
        builder.addCase(getOrCreateConversation.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Send message
        builder.addCase(sendMessage.pending, (state) => {
            state.isSendingMessage = true;
            state.error = "";
        });
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.isSendingMessage = false;
            state.messages.push(action.payload);
            // Sync the sender's ChatList: update latestMessage for this conversation
            const convIndex = state.conversations.findIndex(
                (conv) => conv._id === state.selectedConversation
            );
            if (convIndex !== -1) {
                state.conversations[convIndex] = {
                    ...state.conversations[convIndex],
                    latestMessage: action.payload,
                };
            }
            state.error = "";
        });
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.isSendingMessage = false;
            state.error = action.payload;
        });

        // Get messages
        builder.addCase(getMessages.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        });
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messages = action.payload;
            state.error = "";
        });
        builder.addCase(getMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Get conversation
        builder.addCase(getConversation.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        });
        builder.addCase(getConversation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentConversation = action.payload;
            state.selectedConversation = action.payload._id;
            state.error = "";
        });
        builder.addCase(getConversation.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Get conversations
        builder.addCase(getUserConversations.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        });
        builder.addCase(getUserConversations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.conversations = action.payload;
            state.error = "";
        });
        builder.addCase(getUserConversations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // Mark message as read
        builder.addCase(markMessageAsRead.fulfilled, (state, action) => {
            const messageIndex = state.messages.findIndex(
                (msg) => msg._id === action.payload._id
            );
            if (messageIndex !== -1) {
                state.messages[messageIndex] = action.payload;
            }
        });

        // Silently add a conversation that arrived via socket but wasn't in the list yet.
        // pending/rejected cases intentionally omitted — no isLoading, no error state.
        builder.addCase(silentlyFetchAndAddConversation.fulfilled, (state, action) => {
            if (!action.payload) return; // null means it already existed — nothing to do
            const exists = state.conversations.some((c) => c._id === action.payload._id);
            if (!exists) {
                state.conversations.unshift(action.payload);
            }
        });

        // Add members to group
        builder.addCase(addMembersToGroup.fulfilled, (state, action) => {
            const index = state.conversations.findIndex(c => c._id === action.payload._id);
            if (index !== -1) {
                state.conversations[index] = action.payload;
            }
            if (state.currentConversation && state.currentConversation._id === action.payload._id) {
                state.currentConversation = action.payload;
            }
        });

        // Leave group — only remove from list and set the leftGroupId flag.
        // Do NOT clear currentConversation/messages yet — ChatWindow reads leftGroupId
        // to show the "You've left this group" screen before the user navigates away.
        builder.addCase(leaveGroup.fulfilled, (state, action) => {
            const conversationId = action.payload;
            state.conversations = state.conversations.filter(c => c._id !== conversationId);
            state.leftGroupId = conversationId;
        });
    }
});

export const {
    addMessageLocally,
    receiveMessage,
    setSelectedConversation,
    setIsTyping,
    addTypingUser,
    removeTypingUser,
    clearMessages,
    clearChat,
    clearUnreadCount,
    createTemporaryConversation,
    addConversationToList,
    updateUserStatus,
    updateConversationInList,
    removeConversationFromList
} = chatSlice.actions;

export default chatSlice.reducer;

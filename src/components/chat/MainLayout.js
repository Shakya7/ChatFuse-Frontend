import { Outlet } from "react-router-dom";
import LeftPane from "./LeftPane";
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from "../LoginPage";
import { authenticate } from "../../redux/features/login/loginSlice";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage";
import { fetchAccountData } from "../../redux/features/profile/profileSlice";
import { socket, connectSocket } from "../../socketClient";
import {getFriendRequestedUsers, getUsersWhoSentRequests, getAcceptedFriends, updateFriendStatus} from "../../redux/features/friend/friendSlice";
import { receiveMessage, addTypingUser, removeTypingUser, getUserConversations, updateUserStatus, addConversationToList, silentlyFetchAndAddConversation } from "../../redux/features/chat/chatSlice";
import axios from "axios";


function MainLayout(){
    const theme=useSelector((state)=>state.settings.darkMode);
    const isLoggedIn=useSelector((state)=>state.login_state.isLogged);

    const friends=useSelector((state)=>state.friend.friends);

    const dispatch=useDispatch();
    const isLoading=useSelector((state)=>state.login_state.isLoading);
    const profileID=useSelector((state)=>state.login_state.userID);

    useEffect(()=>{
        if(!isLoggedIn){
            dispatch(authenticate())
        }
    },[])
    useEffect(()=>{
        if(isLoggedIn){
            dispatch(fetchAccountData(profileID));
            connectSocket(profileID);
            dispatch(getFriendRequestedUsers(profileID));
            dispatch(getUsersWhoSentRequests(profileID));
            dispatch(getAcceptedFriends(profileID));
            dispatch(getUserConversations());

            socket.on("connect",()=>{
                console.log(socket.id);
            });
            socket.on("welcome-message",(data)=>{
                console.log(data);
            })
            socket.on("new-friend-request", (data) => {
                console.log(data);
                dispatch(getUsersWhoSentRequests(profileID));
            });
            socket.on("friend-request-sent",(data)=>{
                console.log(data);
                dispatch(getFriendRequestedUsers(profileID));
            });
            socket.on("request-accepted",(data)=>{
                dispatch(getUsersWhoSentRequests(profileID));
                dispatch(getAcceptedFriends(profileID));
                dispatch(getFriendRequestedUsers(profileID));
            })
            socket.on("request-declined",(data)=>{
                dispatch(getUsersWhoSentRequests(profileID));
                dispatch(getFriendRequestedUsers(profileID));
            });
            socket.on("friend-connected",async(data)=>{
                if (!data.id) return;
                let result=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/checkIDPartofFriends/${data.id}`,{
                    profileID
                })
                console.log(result.data.status);
                const isFriend = result.data.status === true || result.data.status === "true";
                if(isFriend) {
                    dispatch(updateFriendStatus({ userId: data.id, status: "Online" }));
                    dispatch(updateUserStatus({ userId: data.id, status: "Online" }));
                }
            })
            socket.on("friend-disconnected",async(data)=>{
                if (!data.id) return;
                let result=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/checkIDPartofFriends/${data.id}`,{
                    profileID
                })
                console.log(result.data.status);
                const isFriend = result.data.status === true || result.data.status === "true";
                if(isFriend) {
                    dispatch(updateFriendStatus({ userId: data.id, status: "Offline" }));
                    dispatch(updateUserStatus({ userId: data.id, status: "Offline" }));
                }
            })

            // Real-time messaging listeners
            socket.on("receive-message", (data) => {
                console.log("Message received:", data);
                dispatch(receiveMessage(data));
                // If this conversation isn't in our list yet (e.g. a group we just joined),
                // silently fetch it from the backend and add it to the ChatList.
                if (data.conversationId) {
                    dispatch(silentlyFetchAndAddConversation(data.conversationId));
                }
            });

            // Group created: non-creator members receive the new group and it appears in ChatList
            socket.on("group-created", (data) => {
                console.log("Group created:", data);
                if (data?.conversation) {
                    dispatch(addConversationToList(data.conversation));
                }
            });

            socket.on("user-typing", (data) => {
                console.log("User typing:", data);
                dispatch(addTypingUser(data.senderId));
            });

            socket.on("user-stop-typing", (data) => {
                console.log("User stopped typing:", data);
                dispatch(removeTypingUser(data.senderId));
            });

            socket.on("message-sent", (data) => {
                console.log("Message sent successfully:", data);
            });

            socket.on("message-error", (data) => {
                console.error("Message error:", data);
            });

            return ()=>{
                socket.off("receive-message");
                socket.off("group-created");
                socket.off("user-typing");
                socket.off("user-stop-typing");
                socket.off("message-sent");
                socket.off("message-error");
                socket.off("connect");
                socket.off("welcome-message");
                socket.off("new-friend-request");
                socket.off("friend-request-sent");
                socket.off("request-accepted");
                socket.off("request-declined");
                socket.off("friend-connected");
                socket.off("friend-disconnected");
            }
        }
    },[isLoggedIn, profileID, dispatch])

    return(
        isLoggedIn?<div className="flex h-screen bg-red-300">
            <LeftPane/>
            <div className={`hidden sm:block sm:basis-3/5 xmd:basis-2/3 h-screen ${theme?"bg-[#261f2d]":"bg-stone-300"}`}>
                <Outlet/>
            </div>
        </div>:
        isLoading?<LoadingPage/>:<LoginPage/>
    )
}

export default MainLayout;
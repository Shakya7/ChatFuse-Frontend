import ChatList from "./ChatList";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setSection } from "../../redux/features/app_state/appStateSlice";
import { useEffect, useContext } from "react";
import ServerLayout from "../channel/ServerLayout";
import ProfileComponent from "../profile/ProfileComponent";
import SearchFriendsToChat from './SearchFriendsToChat';
import FriendRequestsWindow from "../friends/FriendRequestsWindow";
import { useLocation } from "react-router-dom";
import { ScreenWidth } from "../../App";

// Tailwind's `sm` breakpoint
const SM_BREAKPOINT = 640;

function LeftPane(){
    const dispatch=useDispatch();
    const section=useSelector((state)=>state.app_state.current_section);
    const location=useLocation();
    const screenWidth=useContext(ScreenWidth);

    // Only take over the left pane for the friends route on mobile.
    // On desktop (sm+) the Outlet in MainLayout already renders FriendRequestsWindow.
    const isFriendsRoute=location.pathname === "/friends";
    const isMobile=screenWidth < SM_BREAKPOINT;

    useEffect(()=>{
        if(window.location.pathname.includes("channel"))
            dispatch(setSection("channel"))
        else if(window.location.pathname.includes("profile"))
            dispatch(setSection("profile"))
        else
            dispatch(setSection("chat"));
    },[])

    const renderContent = () => {
        // On mobile the Outlet is hidden, so show FriendRequestsWindow here
        if (isFriendsRoute && isMobile) return <FriendRequestsWindow/>;
        if (section==="chat") return <ChatList/>;
        if (section==="search-friends-to-chat") return <SearchFriendsToChat/>;
        if (section==="channel") return <ServerLayout/>;
        if (section==="profile") return <ProfileComponent/>;
        return "No";
    };

    return(
        <div className="flex basis-full sm:basis-2/5 xmd:basis-1/3 h-full overflow-hidden backdrop-blur-md" style={{backgroundColor: "rgba(59, 130, 246, 0.15)"}}>
            <Navbar wdth={"basis-1/6"}/>
            <div className="flex-1 overflow-hidden">
                {renderContent()}
            </div>
        </div>
    )
}

export default LeftPane;
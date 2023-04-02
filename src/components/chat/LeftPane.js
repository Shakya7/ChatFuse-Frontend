import ChatList from "./ChatList";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setSection } from "../../redux/features/app_state/appStateSlice";
import { useEffect } from "react";
import ServerLayout from "../channel/ServerLayout";
import ProfileComponent from "../profile/ProfileComponent";

function LeftPane(){
    const dispatch=useDispatch();
    const section=useSelector((state)=>state.app_state.current_section);

    useEffect(()=>{
        if(window.location.pathname.includes("channel"))
            dispatch(setSection("channel"))
        else if(window.location.pathname.includes("profile"))
            dispatch(setSection("profile"))
        else
            dispatch(setSection("chat"));
    },[])
    return(
        <div className="flex basis-full sm:basis-2/5 xmd:basis-1/3 h-full bg-blue-500 overflow-hidden">
            <Navbar wdth={"basis-1/6"}/>
            {section==="chat"?<ChatList/>:section==="channel"?<ServerLayout/>:section==="profile"?<ProfileComponent/>:"No"}
        </div>
    )
}

export default LeftPane;
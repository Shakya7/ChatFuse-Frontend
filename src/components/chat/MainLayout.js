import { Outlet } from "react-router-dom";
import LeftPane from "./LeftPane";
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from "../LoginPage";
import { authenticate } from "../../redux/features/login/loginSlice";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage";
import { fetchAccountData } from "../../redux/features/profile/profileSlice";

function MainLayout(){
    const theme=useSelector((state)=>state.settings.darkMode);
    const isLoggedIn=useSelector((state)=>state.login_state.isLogged);

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
        }
    },[isLoggedIn])
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
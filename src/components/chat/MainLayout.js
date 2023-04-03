import { Outlet } from "react-router-dom";
import LeftPane from "./LeftPane";
import { useSelector } from 'react-redux';
import LoginPage from "../LoginPage";

function MainLayout(){
    const theme=useSelector((state)=>state.settings.darkMode);
    const isLoggedIn=useSelector((state)=>state.app_state.isLoggedIn);
    return(
        isLoggedIn?<div className="flex h-screen bg-red-300">
            <LeftPane/>
            <div className={`hidden sm:block sm:basis-3/5 xmd:basis-2/3 h-screen ${theme?"bg-[#261f2d]":"bg-stone-300"}`}>
                <Outlet/>
            </div>
        </div>:
        <LoginPage/>
    )
}

export default MainLayout;
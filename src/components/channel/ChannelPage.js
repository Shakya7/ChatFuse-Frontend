import Navbar from "../Navbar"
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import ServerLayout from "./ServerLayout";

function ChannelPage() {
  const theme=useSelector((state)=>state.settings.darkMode);
  return (
    <div className="h-screen flex bg-blue-300 w-screen">
        <Navbar wdth={"basis-[5.5%]"}/>
        <div className="basis-[94.5%] flex bg-yellow-300">
            <ServerLayout/>
            <div className={`hidden sm:block sm:basis-[70.5%] ${theme?"bg-[#261f2d]":"bg-stone-300"}`}>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default ChannelPage
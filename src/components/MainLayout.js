import { Outlet } from "react-router-dom";
import LeftPane from "./LeftPane";
import { useSelector } from 'react-redux';

function MainLayout(){
    const theme=useSelector((state)=>state.settings.darkMode);
    return(
        <div className="flex h-screen bg-red-300">
            <LeftPane/>
            <div className={`hidden sm:block basis-2/3 h-screen ${theme?"bg-[#261f2d]":"bg-stone-100"}`}>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout;
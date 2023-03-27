import { Outlet } from "react-router-dom";
import LeftPane from "./LeftPane";

function MainLayout(){

    return(
        <div className="flex h-screen bg-red-300">
            <LeftPane/>
            <div className="hidden sm:block basis-2/3 h-screen bg-[#261f2d]">
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout;
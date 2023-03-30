import ChatList from "./ChatList";
import Navbar from "../Navbar";

function LeftPane(){
    return(
        <div className="flex basis-full sm:basis-2/5 xmd:basis-1/3 h-full bg-blue-500 overflow-hidden">
            <Navbar wdth={"basis-1/6"}/>
            <ChatList/>
        </div>
    )
}

export default LeftPane;
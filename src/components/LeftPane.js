import ChatList from "./ChatList";
import Navbar from "./Navbar";

function LeftPane(){
    return(
        <div className="flex basis-full sm:basis-1/3 h-full bg-blue-500 overflow-hidden">
            <Navbar/>
            <ChatList/>
        </div>
    )
}

export default LeftPane;
import ReactLoading from "react-loading";
import logo from "../images/logo.png";


function LoadingPage(){
    
    return(
        <div className="min-h-screen w-screen bg-sky-200 flex flex-col gap-3 justify-center items-center">
            <img src={logo} className="mb-5" alt="logo"/>
            <ReactLoading className="text-teal-600" width={"20%"} height={"20%"} type="spinningBubbles" color="#14B8A6"/>
            <div className="flex w-[60%] justify-center gap-2 items-center">
                <ReactLoading className="text-teal-600" width={"10%"} height={"10%"} type="bubbles" color="#14B8A6"/>
                <p className="text-teal-700 text-poppins">Connecting to ChatFuse</p>
                <ReactLoading className="text-teal-600" width={"10%"} height={"10%"} type="bubbles" color="#14B8A6"/>
            </div>
        </div>
    )
}

export default LoadingPage;
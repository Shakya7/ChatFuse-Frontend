import login_art from "../images/login_pic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import {faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";

function SignupPage() {
  const navigation=useNavigate();
  const [passwordVisible, setPasswordVisible]=useState(false);
  return (
    <div className="bg-red-200 flex w-screen overflow-x-hidden min-h-screen">
        <div className="hidden sm:flex sm:w-[50%] flex justify-center item-center bg-blue-900">
            <div className="w-[60%] flex flex-col justify-center items-center text-white">
                <img src={login_art} alt="chat-1"/> 
                <div className="flex items-center mb-3">
                    <img src={logo} alt="logo"/>
                    <p className="text-2xl font-nunito">CHATFUSE</p>
                </div>
                <p className="text-sm font-nunito"><i>Welcome to our chat application! Our platform provides you with a seamless and secure way to connect and chat with your friends, family, and colleagues. Whether you're looking to catch up with old friends or collaborate with coworkers, our app is designed to make communication easy and enjoyable.</i></p>
            </div>
        </div>
        <div className="w-full sm:w-[50%] flex justify-center items-center bg-sky-200">
            <div className="w-[60%] flex flex-col justify-center items-center">
                <img src={logo} alt="logo"/>
                <p className="mb-5 mt-3">Sign up with ChatFuse to continue</p>
                <div className="rounded-md hover:bg-blue-700 cursor-pointer bg-blue-500 flex items-center justify-evenly py-3 px-2 w-full text-white">
                    <FontAwesomeIcon icon={faGoogle}/>
                    <p>Sign up with Google</p>
                </div>
                <div className="flex w-full items-center">
                    <div className="w-full h-[1px] bg-gray-400"/>
                    <p className="m-2">or</p>
                    <div className="w-full h-[1px] bg-gray-400"/>
                </div>
                <div className="w-full mb-4">
                    <input placeholder="full name..." className="w-full outline-none rounded-md py-3 px-2" type="text"/>
                </div>
                <div className="w-full mb-4">
                    <input placeholder="email address..." className="w-full outline-none rounded-md py-3 px-2" type=""/>
                </div>
                <div className="w-full mb-4 flex items-center">
                    <input placeholder="password..." className="w-full outline-none rounded-tl-md rounded-bl-md py-3 px-2" type={passwordVisible?"text":"password"}/>
                    <div onClick={()=>setPasswordVisible((prev)=>!prev)} className="bg-white cursor-pointer py-3 rounded-tr-md px-2 rounded-br-md">
                        <FontAwesomeIcon className="text-teal-600" icon={passwordVisible?faEye:faEyeSlash}/>
                    </div>
                </div>
                <div className="flex w-full mt-2 text-xs">
                    <p>Forgot Password?</p>
                </div>

                <div className="w-full text-white mb-6 mt-4 flex py-3 px-2 justify-center rounded-md bg-teal-600 cursor-pointer hover:bg-teal-400">
                    <p>CONNECT</p>
                </div>
                
                <p onClick={()=>navigation("/login")} className="cursor-pointer w-full border border-transparent flex justify-center text-sm border-t-blue-600 py-3">
                    Already a member? <b className="ml-2">Sign in</b>
                </p>
                
            </div>
        </div>

    </div>
  )
}

export default SignupPage
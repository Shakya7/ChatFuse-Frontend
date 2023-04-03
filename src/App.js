import {BrowserRouter, Routes, Route} from "react-router-dom";
import ChatWindow from "./components/chat/ChatWindow";
import MainLayout from "./components/chat/MainLayout";
import HomeScreenWindow from "./components/chat/HomeScreenWindow";
import { useState, useEffect } from "react";
import { createContext } from "react";
import ChannelWindow from "./components/channel/ChannelWindow";
import ProfileWindow from "./components/profile/ProfileWindow";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

export const ScreenWidth=createContext();

function App() {
  const [screenWidth,setScreenWidth]=useState(window.innerWidth);

  useEffect(()=>{
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

  },[screenWidth])
  
  return (
    <BrowserRouter>
      <ScreenWidth.Provider value={screenWidth}>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route index element={<HomeScreenWindow/>}/>
              <Route path="/chat/:id" element={<ChatWindow/>}/>
              <Route path="/channel" element={<HomeScreenWindow/>}/>
              <Route path="/channel/:id" element={<ChannelWindow/>}/>
              <Route path="/profile" element={<ProfileWindow/>}/>
            </Route>
            <Route path="/mobile-chat/:id" element={<ChatWindow/>}/>
            <Route path="/mobile-channel/:id" element={<ChannelWindow/>}/>
            <Route path="/mobile-timeline" element={<ProfileWindow/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
          </Routes>
      </ScreenWidth.Provider>
    </BrowserRouter>
  );
}

export default App;

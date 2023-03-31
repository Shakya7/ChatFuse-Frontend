import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ScreenWidth } from '../../App';
import { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Channel from './Channel';

function ServerSection() {
  const theme=useSelector((state)=>state.settings.darkMode);
  const navigate=useNavigate();
  const screenWidth=useContext(ScreenWidth);

  useEffect(()=>{
    const path = window.location.pathname;
    const match=path.match(/channel\/(\d+)/);
    const channelID=match?match[1]:""
    if(screenWidth<="640" && path===`/channel/${channelID}`){
        navigate(`/mobile-channel/${channelID}`);
    }
  },[screenWidth]);
  
  return (
    <div className={`basis-4/5 ${theme?"bg-[#2B2C31]":"bg-[#F2F3F5]"} flex flex-col overflow-hidden`}>
        <div className={`${theme?"text-stone-200":"text-stone-800"} cursor-pointer py-5 px-3 flex items-center justify-between backdrop-blur-xl items-center border border-transparent ${theme ? "border-b-stone-900" : "border-b-stone-300"}`}>
            <p className={`text-base`}>Server_name</p>
            <FontAwesomeIcon icon={faAngleDown}/>
        </div>
        <div className={`overflow-y-scroll scrollbar-thin ${theme?"scrollbar-thumb-stone-600":"scrollbar-thumb-stone-400"} flex flex-col gap-5 scrollbar-thumb-rounded px-2 py-3`}>
            <div>
                <div className={`flex justify-between mb-1.5 ${theme?"text-stone-300":"text-stone-600"}`}>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCaretRight}/>
                        <p className="text-sm">TEXT CHANNELS</p>
                    </div>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
                <Channel name={"general"}/>
                <Channel/>
                <Channel/>
                <Channel/>
                <Channel/>
            </div>
            <div>
                <div className={`flex justify-between mb-1.5 ${theme?"text-stone-300":"text-stone-600"}`}>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCaretRight}/>
                        <p className="text-sm">VOICE CHANNELS</p>
                    </div>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
                <Channel name={"general"}/>
                <Channel/>
            </div>
        </div>
    </div>
  );
}

export default ServerSection;

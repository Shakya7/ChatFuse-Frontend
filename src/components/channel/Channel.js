import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { faGear, faHashtag, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ScreenWidth } from '../../App';
import { useContext } from 'react';

function Channel(props) {
  const theme=useSelector((state)=>state.settings.darkMode);
  const navigate=useNavigate();
  const screenWidth=useContext(ScreenWidth);

  return (
    <div onClick={()=>{
        if(screenWidth<="640")
            navigate(`/mobile-channel/1`)
        else
            navigate(`/channel/1`);
        }} className={`flex rounded-md py-1.5 px-1.5 ${theme?"bg-[#414049]":"bg-[#D7D8DC]"} cursor-pointer justify-between mb-2`}>
      <div className="flex pl-1.5 gap-2 items-center w-full overflow-hidden">
        <FontAwesomeIcon
          className={`${theme ? "text-stone-400" : "text-stone-500"}`}
          icon={faHashtag}
        />
        <p className={`text-ellipsis whitespace-nowrap overflow-hidden ${theme ? "text-white" : "text-stone-900"}`}>
        {props.name?props.name:"channel_nameeeeeeeeeeeeeee"}
        </p>
      </div>
      <div className={`flex gap-1.5 items-center text-xs ${theme?"text-stone-300":"text-stone-700"}`}>
        <FontAwesomeIcon className="cursor-pointer" icon={faUserPlus} />
        <FontAwesomeIcon className="cursor-pointer" icon={faGear} />
      </div>
    </div>
  );
}

export default Channel;

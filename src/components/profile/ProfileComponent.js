import { faCaretRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Channel from '../channel/Channel';

function Groups(){
    const theme=useSelector((state)=>state.settings.darkMode);
    return(
        <div className={`${theme?"bg-[#414049]":"bg-[#D7D8DC]"} rounded-md p-1 px-2 ${theme?"text-white":"text-stone-900"} text-ellipsis whitespace-nowrap overflow-hidden`}>group_name</div>
    )
}

function ProfileComponent() {
  const theme=useSelector((state)=>state.settings.darkMode);
  const {name, email, avatar}=useSelector((state)=>state.profile_state);
  return (
    <div className={`${theme?"bg-[#2B2C31]":"bg-stone-400"} w-full scrollbar-none overflow-x-hidden overflow-y-auto`}>
        <div className={`m-3 relative flex text-center justify-start items-center flex-col box-border rounded-lg min-h-[50%] gap-4 ${theme?"bg-stone-800":"bg-stone-300"} p-5`}>
            <div className="relative bg-contain bg-cover w-20 h-20 rounded-full bg-stone-400">
                <div className="absolute w-[20px] h-[20px] border-[3px] border-green-900 rounded-full bg-green-700 bottom-0 right-0"/>
                <FontAwesomeIcon className={`${theme?"text-stone-300":"text-black"} cursor-pointer absolute bottom-0 right-[-20px]`} icon={faPen}/>
                <img src={avatar} className="rounded-full" alt="avatar"/>
            </div>
            <p className={`${theme?"text-stone-400":"text-stone-700"} w-[60%] text-ellipsis whitespace-nowrap overflow-hidden`}>{name}</p>
            <p className={`${theme?"text-stone-400":"text-stone-700"} w-[60%] text-ellipsis whitespace-nowrap overflow-hidden text-sm`}>{email}</p>
            <p className={`${theme?"text-stone-400":"text-stone-700"} w-[80%] overflow-scroll scrollbar-none text-xs`}>dsfdggggggggggggggggggggggggggggggggg dgfgfffsg ffffffffffffffffffffffff</p>
        </div>
        <div className="m-3">
            <div className={`flex items-center gap-1 ${theme?"text-stone-300":"text-stone-800"}`}>
                <FontAwesomeIcon icon={faCaretRight}/>
                <p>Groups</p>
            </div>
            <Groups/>
            
        </div>
        <div className="m-3">
            <div className={`flex items-center gap-1 ${theme?"text-stone-300":"text-stone-800"}`}>
                <FontAwesomeIcon icon={faCaretRight}/>
                <p>Channels</p>
            </div>
            <Channel/>
            <Channel/>
            <Channel/>
            <Channel/>
            <Channel/>
        </div>
    </div>
  )
}

export default ProfileComponent
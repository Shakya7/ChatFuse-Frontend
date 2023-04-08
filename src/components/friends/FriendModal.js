import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faMagnifyingGlass, faUserPlus, faUserCheck, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { getFriends } from "../../redux/features/friend/friendSlice";
import { clearSearchedUser } from "../../redux/features/friend/friendSlice";
import { socket } from "../../socketClient";
import ReactLoading from "react-loading";


function LoadingComponent(){
    const theme=useSelector((state)=>state.settings.darkMode);
    return(
        <div className={`animate-pulse rounded-md p-2 px-3 ${theme?"bg-stone-600":"bg-stone-300"} flex flex-col gap-2`}>
            <div className={`${theme?"bg-stone-500":"bg-stone-400"} w-[70%] py-2`}/>
            <div className={`${theme?"bg-stone-500":"bg-stone-400"} w-[70%] py-2`}/>
        </div>
    )
}

function SearchedUser({email,name,user_id,setSelectedSearchedUsr}){
    const theme=useSelector((state)=>state.settings.darkMode);
    const profileID=useSelector((state)=>state.login_state.userID);
    const {friendRequestedUsers}=useSelector((state)=>state.friend);
    const [isLoading, setIsLoading]=useState(false);
    

    function checkFriendRequestAlreadySent(users,user_id){
        for(let i=0;i<users.length;i++){
            if(users[i].receiver._id.toString()===user_id.toString()){
                return true;
            }
        } 
        return false;
    }

    return(
        <div className={`rounded-md p-1 px-3 ${theme?"bg-stone-600":"bg-stone-300"} flex flex-col mb-2 text-xs gap-1`}>
            <div className="w-[70%] flex justify-between py-1">
                <p>{name}</p>
                {
                    checkFriendRequestAlreadySent(friendRequestedUsers,user_id)?
                    <FontAwesomeIcon className="text-green-600 place-self-end cursor-pointer" icon={faUserCheck}/>:
                    isLoading?<ReactLoading width={"5%"} height={"5%"} type="spin" color="#14B8A6"/>:<FontAwesomeIcon onClick={()=>{
                        setIsLoading(true);
                        socket.emit("send-friend-request",{receiver:user_id, sender:profileID});
                    }} className="text-green-600 place-self-end cursor-pointer" icon={faUserPlus}/>
                }
            </div>
            <div className=" w-[70%] py-1">{email}</div>
        </div>
    )
}

function FriendRequestComponent({user}){
    const [isLoading, setIsLoading]=useState(false);
    const profileID=useSelector((state)=>state.login_state.userID);
    const theme=useSelector((state)=>state.settings.darkMode);

    return(
        <div className={`text-xs ${theme?"bg-stone-700":"bg-stone-300"} rounded-md p-2 gap-4 flex flex-wrap`}>
            <p>{user.sender.name}</p>
            <div className="flex gap-4">
                {isLoading?
                <ReactLoading width={"1rem"} height={"1rem"} type="spin" color="#14B8A6"/>:
                <FontAwesomeIcon onClick={()=>{
                    setIsLoading(true)
                    socket.emit("accept-friend-request",{sender:user.sender._id, profileID})
                }} className="text-green-600 cursor-pointer" icon={faCheck}/>}
                <FontAwesomeIcon onClick={()=>{}} className="text-red-500 cursor-pointer" icon={faXmark}/>
            </div> 
        </div>
    )
}

function FriendModal(props) {
  const theme=useSelector((state)=>state.settings.darkMode);
  const {isSearchingUsers,searchedUsers, friendRequestsFromUsers}=useSelector((state)=>state.friend);
  const profileID=useSelector((state)=>state.login_state.userID);
  const [searchFriendTerm, setSearchFriendTerm]=useState(false);
  const dispatch=useDispatch();
  const inputRef=useRef(null);
  const [clear,setClear]=useState(true);



  return (
    <div className={`w-[80%] h-[80%] ${theme?"bg-stone-700":"bg-neutral-200"} border ${theme?"border-stone-200":"border-stone-800"} ${theme?"text-white":"text-stone-800"}  rounded-md flex flex-col items-center sm:items-start p-4 relative gap-2 m-5`}>
        <div onClick={e=>{
            dispatch(clearSearchedUser());
            props.closeModal(false);
            }} className="self-end	cursor-pointer text-updateTodoText xxsm:text-2xl">X</div>
        <div className={`h-auto max-h-[50%] overflow-y-auto w-full scrollbar-thin scrollbar-thumb-rounded ${theme?"scrollbar-thumb-zinc-400":"scrollbar-thumb-zinc-700"}`}>
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCaretRight}/>
                <p>{`FRIEND REQUESTS (${friendRequestsFromUsers.length})`}</p>
            </div>
            <div className={`${theme?"bg-stone-600":"bg-stone-400"} w-full flex flex-col gap-2 h-[full] p-3`}>
            {
            friendRequestsFromUsers.length?
            friendRequestsFromUsers.map((user)=>
                <FriendRequestComponent user={user} key={user.sender._id}/>):
            ""
            }  
            </div>
        </div>

        <div className="w-full flex flex-col h-[50%]">
            <div className="flex mt-2 items-center gap-2">
                <FontAwesomeIcon icon={faCaretRight}/>
                <p>ADD FRIEND</p>
            </div>
            <div className="flex items-baseline gap-1">
                <div className={`${theme?"bg-[#1d1923]":"bg-white"} w-full sm:w-[50%] mt-2.5 rounded-lg py-2 flex justify-between items-center`}>
                    <input ref={inputRef} onChange={(e)=>setSearchFriendTerm(e.target.value)} placeholder='Search by name or email' className={`bg-transparent pl-2 outline-0 text-sm ${theme?"text-white":"text-black"} w-[75%] h-auto placeholder:text-stone-700`}/>
                    <FontAwesomeIcon onClick={()=>{
                        if(searchFriendTerm.includes("@"))
                            dispatch(getFriends({type:"email",searchFriendTerm, profileID}));
                        else{
                            dispatch(getFriends({type:"name",searchFriendTerm, profileID}));
                        }
                        setClear(false);
                        }} className="text-stone-700 cursor-pointer pr-2" icon={faMagnifyingGlass}/>
                </div>
                <div onClick={()=>{
                    inputRef.current.value="";
                    dispatch(clearSearchedUser());
                    inputRef.current.focus();
                    setClear(true);
                    }} className="bg-red-500 cursor-pointer text-white rounded-md py-2 px-3">Clear</div>
            </div>
            <div className={`p-2 w-full sm:w-[50%] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded ${theme?"scrollbar-thumb-zinc-400":"scrollbar-thumb-zinc-700"}  h-full max-h-[full]`}>
            {isSearchingUsers?<div className="flex flex-col gap-2"><LoadingComponent/><LoadingComponent/></div>:
            searchedUsers.length?searchedUsers.map((user)=><SearchedUser user_id={user._id} email={user.email} name={user.name} key={user._id}/>):clear?"":<p className="text-xs">No users found or already friend</p>
            }
            </div>
        </div>

    </div>
  )
}

export default FriendModal
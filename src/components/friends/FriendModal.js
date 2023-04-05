import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faMagnifyingGlass, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { getFriends } from "../../redux/features/friend/friendSlice";
import { clearSearchedUser } from "../../redux/features/friend/friendSlice";



function LoadingComponent(){
    const theme=useSelector((state)=>state.settings.darkMode);
    return(
        <div className={`animate-pulse rounded-md p-2 px-3 ${theme?"bg-stone-600":"bg-stone-300"} flex flex-col gap-2`}>
            <div className={`${theme?"bg-stone-500":"bg-stone-400"} w-[70%] py-2`}/>
            <div className={`${theme?"bg-stone-500":"bg-stone-400"} w-[70%] py-2`}/>
        </div>
    )
}

function SearchedUser({email,name}){
    const theme=useSelector((state)=>state.settings.darkMode);
    return(
        <div className={`rounded-md p-1 px-3 ${theme?"bg-stone-600":"bg-stone-300"} flex flex-col mb-2 text-xs gap-1`}>
            <div className="w-[70%] flex justify-between py-1">
                <p>{name}</p>
                <FontAwesomeIcon className="text-green-600 place-self-end" icon={faUserPlus}/>
            </div>
            <div className=" w-[70%] py-1">{email}</div>
        </div>
    )
}

function FriendModal(props) {
  const theme=useSelector((state)=>state.settings.darkMode);
  const {isSearchingUsers,searchedUsers}=useSelector((state)=>state.friend);
  const [searchFriendTerm, setSearchFriendTerm]=useState(false);
  const dispatch=useDispatch();
  const inputRef=useRef(null);


  return (
    <div className={`w-[80%] h-[80%] ${theme?"bg-stone-700":"bg-neutral-200"} border ${theme?"border-stone-200":"border-stone-800"} ${theme?"text-white":"text-stone-800"}  rounded-md flex flex-col items-center sm:items-start p-4 relative gap-2 m-5`}>
        <div onClick={e=>{
            dispatch(clearSearchedUser());
            props.closeModal(false);
            }} className="self-end	cursor-pointer text-updateTodoText xxsm:text-2xl">X</div>
        <div className="h-auto max-h-[50%] overflow-clip w-full">
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCaretRight}/>
                <p>{`FRIEND REQUESTS (${1})`}</p>
            </div>
            <div className={`${theme?"bg-stone-600":"bg-stone-400"} w-full scrollbar-thin scrollbar-thumb-rounded ${theme?"scrollbar-thumb-zinc-400":"scrollbar-thumb-zinc-700"} overflow-y-auto h-auto max-h-[full] p-3`}>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                
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
                            dispatch(getFriends({type:"email",searchFriendTerm}));
                        else{
                            console.log(searchFriendTerm)
                            dispatch(getFriends({type:"name",searchFriendTerm}));
                        }
                        }} className="text-stone-700 cursor-pointer pr-2" icon={faMagnifyingGlass}/>
                </div>
                <div onClick={()=>{
                    inputRef.current.value="";
                    dispatch(clearSearchedUser());
                    inputRef.current.focus();
                    }} className="bg-red-500 cursor-pointer text-white rounded-md py-2 px-3">Clear</div>
            </div>
            <div className={`p-2 w-full sm:w-[50%] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded ${theme?"scrollbar-thumb-zinc-400":"scrollbar-thumb-zinc-700"}  h-full max-h-[full]`}>
            {isSearchingUsers?<div className="flex flex-col gap-2"><LoadingComponent/><LoadingComponent/></div>:
            searchedUsers && searchedUsers.map((user)=><SearchedUser email={user.email} name={user.name} key={user._id}/>)
            }
            </div>
        </div>

    </div>
  )
}

export default FriendModal
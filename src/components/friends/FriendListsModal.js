import { useSelector } from "react-redux";

function FriendComponent({name,email}){
    return(
        <div className="bg-stone-800 px-3 w-full rounded-md mb-3.5">
            <p className="text-ellipsis whitespace-nowrap overflow-hidden">{name}</p>
            <p className="text-ellipsis whitespace-nowrap overflow-hidden">{email}</p>
        </div>
    )
}

function FriendListsModal(props) {
  const friends=useSelector((state)=>state.friend.friends);
  const theme=useSelector((state)=>state.settings.darkMode);
  console.log(friends);
  return (
    <>
        <div onClick={e=>{
            props.closeModal(false);
        }} className="self-end cursor-pointer text-updateTodoText xxsm:text-2xl">X</div>
        <div className={`w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded ${theme?"scrollbar-thumb-zinc-400":"scrollbar-thumb-zinc-700"}`}>
        {
            friends.map((friend)=><FriendComponent key={friend._id} name={friend.name} email={friend.email}/>)
        } 
        </div>

    </>
  )
}

export default FriendListsModal
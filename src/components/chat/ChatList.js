import React from 'react'
import ChatHeads from './ChatHeads';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';


const users=[
    {
        id:12345,
        name:"Subarna",
        message:"Lets party on Saturday and play cricket hahahahaha"
    },
    {
        id:76434,
        name:"Sohom",
        message:"ONE PIECE is REAL!!"
    },
    {
        id:87234,
        name:"Moon",
        message:"Yoooooooo"
    },
    {
        id:87612,
        name:"Supratik",
        message:"Whats up bhai?"
    },
   
]

function ChatList() {
  const theme=useSelector((state)=>state.settings.darkMode);
  return (
        <div className={`${theme?"bg-[#29252e]":"bg-stone-200"} basis-5/6 h-full overflow-y-auto`}>
            <div className="px-5">
                <div className={`h-16 border border-transparent ${theme?"border-b-stone-700":"border-b-stone-300"}`}>
                
                </div>
                <div className="flex flex-col mt-4">
                    <div className="flex justify-between items-baseline">
                        <div className="flex flex-col xmd:flex-row gap-3 items-baseline font-nunito">
                            <p className={`text-2xl ${theme?"text-white":"text-black"}`}>Messages</p>
                            <b className="text-teal-500">48 New</b>
                        </div>
                        <FontAwesomeIcon className="text-teal-500 text-lg cursor-pointer" icon={faPenToSquare}/>
                    </div>
                    <div className={`${theme?"bg-[#1d1923]":"bg-white"} mt-2.5 rounded-lg py-2 flex justify-between items-center`}>
                        <input placeholder='Search anything' className={`bg-transparent pl-2 outline-0 text-sm ${theme?"text-white":"text-black"} w-[75%] placeholder:text-stone-700`}/>
                        <FontAwesomeIcon className="text-stone-700 pr-2" icon={faMagnifyingGlass}/>
                    </div>
                </div>
                <section className="mt-5 pb-5">
                {
                    users &&
                    users.map((el)=>{
                        // return <div key={el.id} onClick={()=>{
                        //         navigate(`/chat/${el.id}`,{state:{message:el.message}})

                        // }} className="bg-pink-200 cursor-pointer"><p>{el.name}</p><p>{el.message}</p></div>
                        return <ChatHeads key={el.id} id={el.id} message={el.message} name={el.name}/>
                    })
                }
                </section>
            </div>
            
        </div>
  )
}

export default ChatList
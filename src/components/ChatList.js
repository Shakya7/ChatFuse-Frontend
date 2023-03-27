import React from 'react'
import { useNavigate } from 'react-router-dom';
import ChatHeads from './ChatHeads';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const users=[
    {
        id:12345,
        name:"Subarna",
        message:"Lets party on Saturday and play cricket hahahahaha"
    },
    {
        id:76434,
        name:"Sohom",
        message:"Khankir chele"
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
    }
]

function ChatList() {
  const navigate=useNavigate();
  return (
    <div className="bg-[#29252e] basis-5/6 h-full overflow-hidden">
        <div className="px-5">
            <div className="h-16 border border-transparent border-b-stone-700">
            
            </div>
            <div className="flex flex-col mt-4">
                <div className="flex justify-between items-baseline">
                    <div className="flex gap-3 items-baseline font-nunito">
                        <p className="text-2xl text-white">Messages</p>
                        <b className="text-teal-500">48 New</b>
                    </div>
                    <FontAwesomeIcon className="text-teal-500 text-lg cursor-pointer" icon={faPenToSquare}/>
                </div>
                <div className="bg-[#1d1923] mt-2.5 rounded-lg py-2">
                    <input placeholder='Search anything' className="bg-transparent pl-2 outline-0 text-sm text-white placeholder:text-stone-700"/>
                    
                </div>
            </div>
            <section className="mt-5">
            {
                users &&
                users.map((el)=>{
                    // return <div key={el.id} onClick={()=>{
                    //         navigate(`/chat/${el.id}`,{state:{message:el.message}})

                    // }} className="bg-pink-200 cursor-pointer"><p>{el.name}</p><p>{el.message}</p></div>
                    return <ChatHeads key={el.id} message={el.message} name={el.name}/>
                })
            }
            </section>
        </div>
        
    </div>
  )
}

export default ChatList
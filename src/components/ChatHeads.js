import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

function ChatHeads(props) {
  return (
    <div className="mt-6 flex justify-between items-center w-full text-sm">
                    <div className="flex justify-start items-center w-4/5 gap-2 overflow-hidden">
                        <div className="w-10 min-w-[2.5rem] h-10 min-h-[2.5rem] rounded-full bg-red-300"/>
                        <div className="w-full overflow-hidden">
                            <p className="text-white">{props.name}</p>
                            <p className="text-ellipsis whitespace-nowrap overflow-hidden text-stone-400">{props.message}</p>
                        </div>
                    </div>
                    <div className="w-1/5 text-right">
                        <div className="text-stone-400">13:23pm</div>
                        <FontAwesomeIcon className="text-green-400" icon={faCheckDouble}/>
                    </div>
                </div>
  )
}

export default ChatHeads
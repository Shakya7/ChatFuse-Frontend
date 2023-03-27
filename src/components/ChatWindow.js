import React, {useEffect, useState} from 'react'

import {useNavigate } from 'react-router-dom';

function ChatWindow() {

    const navigate=useNavigate();

    const [message,setMessage]=useState("");
    return (
        <div className="bg-green-400 h-screen">
        {
            message
        }
        </div>
    )
}

export default ChatWindow
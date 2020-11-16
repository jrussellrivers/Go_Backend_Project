import React, { Component } from "react";
import {useSelector, useDispatch} from 'react-redux'
import "./ChatInput.scss";


const ChatInput = ({send}) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            send(e.target.value)
            e.target.value = ''
        }
    }

    return (
        <div className="ChatInput">
            <input onKeyDown={handleKeyDown} placeholder={"Type a Message: Hit 'Enter' to Send"}/>
        </div>
    );
}

export default ChatInput;
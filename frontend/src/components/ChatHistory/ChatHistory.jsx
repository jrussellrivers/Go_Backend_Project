import React, { Component } from "react";
import {useSelector, useDispatch} from 'react-redux'
import "./ChatHistory.css";

const ChatHistory = () => {

    const dispatch = useDispatch()
    const chatHistory = useSelector(state => state.messages.messages)

    const messages = chatHistory.map((msg, index) => (
    <p key={index}>{msg}</p>
    ));

    return (
        <div className="ChatHistory">
            <h2>Chat History</h2>
            {messages}
        </div>
    );

}

export default ChatHistory;
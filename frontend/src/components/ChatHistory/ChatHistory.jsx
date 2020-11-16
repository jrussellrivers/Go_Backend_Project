import React, { Component } from "react";
import {useSelector, useDispatch} from 'react-redux'
import "./ChatHistory.scss";
import Message from "../Message/Message"

const ChatHistory = () => {

    const chatHistory = useSelector(state => state.messages.messages)

    const messages = chatHistory.map((msg, index) => (
        <Message key={index} message={msg} />
    ));

    return (
        <div className="ChatHistory">
            <h2>Chat History</h2>
            {messages}
        </div>
    );

}

export default ChatHistory;
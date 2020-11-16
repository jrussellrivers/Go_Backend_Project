import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { connect, sendMsg } from "./api/index"
import {addMessage} from './app/slices/messagesSlice'
import Header from './components/Header/Header';
import ChatHistory from './components/ChatHistory/ChatHistory'
import ChatInput from './components/ChatInput/ChatInput'

export default function Page() {

    const dispatch = useDispatch()
    const chatHistory = useSelector(state => state.messages.messages)

    connect((msg) => {
        dispatch(addMessage(msg))
    })

    function send(msg) {
        sendMsg(msg);
    }

    return (
        <div>
            <Header />
            <ChatHistory />
            <ChatInput send={send} />
        </div>
    );
}
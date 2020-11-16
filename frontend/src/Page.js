import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { connect, sendMsg } from "./api/index"
import {addMessage} from './app/slices/messagesSlice'
import Header from './components/Header/Header';
import ChatHistory from './components/ChatHistory/ChatHistory'

export default function Page() {

    const dispatch = useDispatch()
    const chatHistory = useSelector(state => state.messages.messages)

    connect((msg) => {
        dispatch(addMessage(msg))
    })
    // useEffect(()=>{
    //     connect((msg) => {
    //         console.log("New Message")
    //         this.setState(prevState => ({
    //             chatHistory: [...this.state.chatHistory, msg]
    //         }))
    //         console.log(this.state);
    //     });
    // })

    function send() {
        console.log("hello");
        sendMsg("hello");
    }

    return (
        <div>
            <Header />
            <ChatHistory />
            <button onClick={send}>Hit</button>
        </div>
    );
}
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { connect, sendMsg } from "./api/index"
import Header from './components/Header/Header';
import Login from './components/Login/Login'
import ChatHistory from './components/ChatHistory/ChatHistory'
import ChatInput from './components/ChatInput/ChatInput'

export default function Page() {

    const dispatch = useDispatch()
    // const chatHistory = useSelector(state => state.messages.messages)

    // const user = useSelector(state => state.user.user)
    // console.log(user)


    // function send(msg) {
    //     sendMsg(msg);
    // }

    // let content = null
    // if (user != undefined){
    //     content = <div>
    //                 <ChatHistory />
    //                 <ChatInput send={send} />
    //             </div>
    // }

    return (
        <div>
            <Header />
            <Login />
            {/* {content} */}
        </div>
    );
}
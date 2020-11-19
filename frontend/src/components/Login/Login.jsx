import React, { Component, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.scss";
import {addUser} from '../../app/slices/userSlice'
import {connect} from '../../api/index'
import {addMessage} from '../../app/slices/messagesSlice'
import ChatHistory from '../ChatHistory/ChatHistory'
import ChatInput from '../ChatInput/ChatInput'





const Login = () => {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("")

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.user)

    function validateForm() {
    // return username.length > 0 && password.length > 0;
        return username.length > 0
    }
    // var content = null

    const handleSubmit = async event => {
        event.preventDefault();
        let formData = {
            Username: username
        }
        dispatch(addUser(username))

        await fetch(`http://localhost:8080/login`,{method:'POST',body:JSON.stringify(formData),mode: 'no-cors'})
        .then(data=>console.log(data))

        var socket = new WebSocket("ws://localhost:8080/ws");

        let connect = cb => {
            console.log("connecting");

            socket.onopen = (e) => {
                console.log(e)
                console.log("Successfully Connected");
            };

            socket.onmessage = msg => {
                console.log(msg);
                cb({
                    data:msg.data,
                    timeStamp:Date.now()
                });
            };

            socket.onclose = event => {
                console.log("Socket Closed Connection: ", event);
            };

            socket.onerror = error => {
                console.log("Socket Error: ", error);
            };
        };

        let sendMsg = msg => {
            console.log("sending msg: ", msg);
            socket.send(msg);
        };

        setContent(
            <div>
            <ChatHistory />
            <ChatInput send={sendMsg} />
            </div>
        )
        connect((msg) => {
            dispatch(addMessage(msg))
        })

    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="username" className='group'>
                {/* <Form.Label>Username</Form.Label> */}
                <Form.Control
                autoFocus
                type="username"
                value={username}
                placeholder="Choose a Username"
                className="input"
                onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            {/* <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group> */}
            <Button block size="lg" type="submit" disabled={!validateForm()}>
                Submit
            </Button>
            </Form>
            {content}
        </div>
    );
}

export default Login;
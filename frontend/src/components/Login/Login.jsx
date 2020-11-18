import React, { Component, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.scss";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
    return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch(`localhost:8080/login`,{method:'post',body:JSON.stringify(formData),headers:{'Content-Type': 'application/json'}})
        .then(data=>data.json())
        .then(json=>{
            if (json.success === true){
                dispatch(changeToken(json))
                dispatch(changePage('feed'))
            } 
        })
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                autoFocus
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
                Login
            </Button>
            </Form>
        </div>
    );
}

export default Login;
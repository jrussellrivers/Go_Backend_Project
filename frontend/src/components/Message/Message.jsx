import React from "react";
import "./Message.scss";

const Message = ({message}) => {

    let temp = JSON.parse(message)

    return <div className="Message">{temp.body}</div>;

}

export default Message;
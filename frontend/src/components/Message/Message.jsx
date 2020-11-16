import React from "react";
import "./Message.scss";

const Message = ({message}) => {
    let temp = JSON.parse(message.data)
    let utcDate = message.timeStamp
    var localDate = new Date(utcDate).toLocaleString()

    return <div className="Message"><span>{temp.body}</span><span >{localDate}</span></div>;
}

export default Message;
import React from 'react'

function Message({text,time,author,uid}) {

    const localTime = new Date(time?.toDate()).toLocaleTimeString();
    return (
        <div className={`chatBoxMessage ${author===uid?"sentChat":""}`}>
            <p>{text}</p>
            <small>{localTime}</small>
        </div>
    )
}

export default Message

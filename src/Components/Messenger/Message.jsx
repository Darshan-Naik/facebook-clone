import React from 'react'

function Message({text,time,author,uid}) {
    const localTime = new Date(time?.toDate()).toLocaleTimeString();
    
    return (
        <div className={`MessengerBoxMessage ${author===uid?"MessengerSentChat":""}`}>
            <p>{text}  </p>
            <small>{localTime}</small>
        </div>
    )
}

export default Message

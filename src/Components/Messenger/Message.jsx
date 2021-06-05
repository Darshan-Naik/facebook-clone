import React from 'react'

function Message({text,time,author,uid}) {

    
    return (
        <div className={`MessengerBoxMessage ${author===uid?"MessengerSentChat":""}`}>
            <p>{text}</p>
        </div>
    )
}

export default Message

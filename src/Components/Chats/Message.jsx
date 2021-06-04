import React from 'react'

function Message({text,time,author,uid}) {

    
    return (
        <div className={`chatBoxMessage ${author===uid?"sentChat":""}`}>
            <p>{text}</p>
        </div>
    )
}

export default Message

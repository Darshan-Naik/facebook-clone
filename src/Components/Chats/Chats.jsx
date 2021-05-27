import React from 'react'
import "../../Styles/Chats/Chats.css"
import ChatBox from './ChatBox'
import ChatBubble from './ChatBubble'

function Chats() {
    return (
        <>
        <div className="chatsContainer flexBox">
            <ChatBox />
            <ChatBox />
            <ChatBox />
        </div>
        <ChatBubble />
        </>
    )
}

export default Chats

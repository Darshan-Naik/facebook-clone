import React from 'react'
import ChatBoxHeader from './ChatBoxHeader'
import ChatBoxInput from './ChatBoxInput'

function ChatBox({active,handleActiveChatBox,index}) {
    return (
        <div className={`chatBoxContainer flexBox ${active && "activeBox"}`} onClick={()=>handleActiveChatBox(index)}>
            <ChatBoxHeader />
            <div className="chatMessages">
            
            </div>
            <ChatBoxInput active={active}/>
        </div>
    )
}

export default ChatBox

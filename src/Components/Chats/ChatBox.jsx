import React from 'react'
import ChatBoxHeader from './ChatBoxHeader'
import ChatBoxInput from './ChatBoxInput'

function ChatBox({chatId,data,active,handleActiveChatBox,index}) {
    return (
        <div className={`chatBoxContainer flexBox ${active && "activeBox"}`} onClick={()=>handleActiveChatBox(index)}>
            <ChatBoxHeader chatId={chatId} {...data} />
            <div className="chatMessages">
            
            </div>
            <ChatBoxInput active={active}/>
        </div>
    )
}

export default ChatBox

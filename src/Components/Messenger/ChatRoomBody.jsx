import React from 'react'
import ChatBodyHeader from './ChatBodyHeader'
import ChatBodyInput from './ChatBodyInput'

function ChatRoomBody({handleUserDetailsVisibility,data}) {
    return (
        <div className="chatRoomBodyContainer flexBox" >
           <ChatBodyHeader handleUserDetailsVisibility={handleUserDetailsVisibility} {...data} />
           <div className="chatRoomMessageBox">

           </div>
           <ChatBodyInput />
        </div>
    )
}

export default ChatRoomBody

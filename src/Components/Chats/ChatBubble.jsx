import React from 'react'
import {ReactComponent as NewMessageIcon} from  "../../Icons/newMessage.svg"

function ChatBubble({toggleNewChatBox}) {
    return (
        <div className="chatBubble flexBox" onClick={toggleNewChatBox}>
            <NewMessageIcon/>
        </div>
    )
}

export default ChatBubble

import React from 'react'
import {ReactComponent as NewMessageIcon} from  "../../Icons/newMessage.svg"

function ChatBubble() {
    return (
        <div className="chatBubble flexBox">
            <NewMessageIcon/>
        </div>
    )
}

export default ChatBubble

import React from 'react'
import { useSelector } from 'react-redux'
import "../../Styles/Chats/Chats.css"
import ChatBox from './ChatBox'
import ChatBubble from './ChatBubble'

function Chats() {
    const activeMessages = useSelector(store=>store.app.activeMessages)
    const [activeChatIndex,setActiveChatIndex] = React.useState(0)
    const handleActiveChatBox = (index)=>{
        setActiveChatIndex(index)
    }

    return (
        <>
        <div className="chatsContainer flexBox">
            {activeMessages.map(({userDetails,chatId},i)=><ChatBox chatId={chatId} data={userDetails} active={activeChatIndex === i} handleActiveChatBox={handleActiveChatBox} index={i}/>)}
        </div>
        <ChatBubble />
        </>
    )
}

export default Chats

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
    React.useEffect(()=>{
        setActiveChatIndex(activeMessages.length-1)
    },[activeMessages])

    return (
        <>
        <div className="chatsContainer flexBox">
            {activeMessages.map((val,i)=><ChatBox active={activeChatIndex === i} handleActiveChatBox={handleActiveChatBox} index={i}/>)}
        </div>
        <ChatBubble />
        </>
    )
}

export default Chats

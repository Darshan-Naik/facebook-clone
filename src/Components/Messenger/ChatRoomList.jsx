import React from 'react'
import { useSelector } from 'react-redux'
import ChatListHeader from './ChatListHeader'
import ChatRoomCard from './ChatRoomCard'

function ChatRoomList() {
    const chats = useSelector(store=>store.app.activeContacts)
    return (
        <div className="chatRoomListContainer scroll flexBox">
            <ChatListHeader />
            <div className="chatRoomListBox">
                {chats.map((chat)=><ChatRoomCard  {...chat} />)}
            </div>
        </div>
    )
}

export default ChatRoomList

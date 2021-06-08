import React from 'react'
import ChatListHeader from './ChatListHeader'
import ChatRoomCard from './ChatRoomCard'

function ChatRoomList({chatRooms}) {
    return (
        <div className="chatRoomListContainer scroll flexBox">
            <ChatListHeader />
            <div className="chatRoomListBox">
                {chatRooms.map((chatRoom)=><ChatRoomCard key={chatRoom.chatID} {...chatRoom} />)}
            </div>
        </div>
    )
}

export default ChatRoomList

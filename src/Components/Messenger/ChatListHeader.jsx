import React from 'react'
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg"
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import {ReactComponent as NewMessageIcon} from  "../../Icons/newMessage.svg"
function ChatListHeader() {
    return (
        <div className="chatListHeaderContainer">
            <div className="chatListHeaderBox flexBox">
                <h1>Chats</h1>
                <div className="chatListHeaderIcons flexBox">
                        <DotsIcon />
                        <NewMessageIcon />
                </div>
            </div>
            <div className="chatListSearchBox flexBox">
                <SearchIcon/>
                <input type="text" name="search"  placeholder="Search Messenger" />
            </div>
        </div>
    )
}

export default ChatListHeader

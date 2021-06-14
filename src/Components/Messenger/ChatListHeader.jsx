import React from 'react'
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg"
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import {ReactComponent as NewMessageIcon} from  "../../Icons/newMessage.svg"
import UserResultCard from './UserResultCard'
import { useSelector } from 'react-redux'

function ChatListHeader() {
    const messengerInputRef = React.useRef()
    const [query,setQuery] = React.useState("")
    const friends = useSelector(store=>store.auth.friends)
    const users = useSelector(store=>store.app.users)
    const result = users.filter(user=>{
        return `${user.first_name} ${user.last_name}`.toLowerCase().includes(query.toLowerCase()) && JSON.stringify(friends).includes(user.uid) && query
      })
    return (
        <div className="chatListHeaderContainer">
            <div className="chatListHeaderBox flexBox">
                <h1>Chats</h1>
                <div className="chatListHeaderIcons flexBox">
                        <DotsIcon />
                        <NewMessageIcon onClick={()=>messengerInputRef.current.focus()}/>
                </div>
            </div>
            <div className="chatListSearchBox flexBox">
                <SearchIcon/>
                <input type="text" ref={messengerInputRef} placeholder="Search Messenger" value={query} onChange={(e)=>setQuery(e.target.value)} />
            </div>
            <div className="messengerResults scroll" style={{display:query?"block":"none"}}>
            {result.length?(result.map(user=><UserResultCard key={user.uid} {...user} setQuery={setQuery}/>)) :  ( query && <div className="noFriendsFound">No friends found</div>)}
            </div>
        </div>
    )
}

export default ChatListHeader

import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import UserResultCard from './UserResultCard'

function NewChatBox({toggleNewChatBox}) {
    const [query,setQuery] = React.useState("")
    const friends = useSelector(store=>store.auth.friends)
    const users = useSelector(store=>store.app.users)

    const result = users.filter(user=>{
      return `${user.first_name} ${user.last_name}`.toLowerCase().includes(query.toLowerCase()) && JSON.stringify(friends).includes(user.uid) && query
    })

    return (
        <div className={`chatBoxContainer flexBox`} >
            <div className="newChatBoxHeader flexBox">
                    <p>New message</p>
                    <CloseIcon onClick={toggleNewChatBox}/>
            </div>
            <div className="newChatSearchContainer flexBox">
                <p>To:</p>
                <input type="text" autoFocus value={query} onChange={(e)=>setQuery(e.target.value)}/>
            </div>
            <div className="newChatSearchResultContainer scroll">

                {result.length?(result.map(user=><UserResultCard key={user.uid} {...user} toggleNewChatBox={toggleNewChatBox}/>)) :  ( query && <div className="noFriendsFound">No friends found</div>)}
                
            </div>
        </div>
    )
}

export default NewChatBox

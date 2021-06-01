import React from 'react'
import ChatRoomBody from './ChatRoomBody'
import ChatRoomList from './ChatRoomList'
import UserDetails from './UserDetails'
import "../../Styles/Messenger/Messenger.css"
import { useSelector } from 'react-redux'
function Messenger({handleRefresh}) {
    const [userDetailsVisibility,setUserDetailsVisibility ] = React.useState(true)
    React.useEffect(handleRefresh)

    const chats = useSelector(store=>store.app.activeContacts)

    const handleUserDetailsVisibility=()=>{
        setUserDetailsVisibility(!userDetailsVisibility)
    }
    return (
        <div className="messengerMainContainer flexBox">
            <ChatRoomList />
            <ChatRoomBody handleUserDetailsVisibility={handleUserDetailsVisibility} data={chats[0]}/>
           {userDetailsVisibility && <UserDetails {...chats[0]} />}
        </div>
    )
}

export default Messenger

import React from 'react'
import ChatRoomBody from './ChatRoomBody'
import ChatRoomList from './ChatRoomList'
import UserDetails from './UserDetails'
import "../../Styles/Messenger/Messenger.css"
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

function Messenger({handleRefresh}) {
    const [userDetailsVisibility,setUserDetailsVisibility ] = React.useState(true)
    React.useEffect(handleRefresh,[])
    const chatRooms = useSelector(store=>store.app.chatRooms)
    const {chatID} = useParams()

    const handleUserDetailsVisibility=()=>{
        setUserDetailsVisibility(!userDetailsVisibility)
    }
    return (
        <div className="messengerMainContainer flexBox">
            <ChatRoomList chatRooms={chatRooms}/>
            <ChatRoomBody handleUserDetailsVisibility={handleUserDetailsVisibility} />
           {userDetailsVisibility && chatID!=="new" && <UserDetails />}
        </div>
    )
}

export default Messenger

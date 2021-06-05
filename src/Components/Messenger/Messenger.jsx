import React from 'react'
import ChatRoomBody from './ChatRoomBody'
import ChatRoomList from './ChatRoomList'
import UserDetails from './UserDetails'
import "../../Styles/Messenger/Messenger.css"

function Messenger({handleRefresh}) {
    const [userDetailsVisibility,setUserDetailsVisibility ] = React.useState(true)
    React.useEffect(handleRefresh)


    const handleUserDetailsVisibility=()=>{
        setUserDetailsVisibility(!userDetailsVisibility)
    }
    return (
        <div className="messengerMainContainer flexBox">
            {/* <ChatRoomList /> */}
            <ChatRoomBody handleUserDetailsVisibility={handleUserDetailsVisibility} />
           {userDetailsVisibility && <UserDetails />}
        </div>
    )
}

export default Messenger

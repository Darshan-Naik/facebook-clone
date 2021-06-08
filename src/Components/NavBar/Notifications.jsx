import React from 'react'
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import NotificationCard from './NotificationCard'
function Notifications({notifications}) {

    return (
        <div className="notificationsContainer">
            <div className="notificationsHeader flexBox">
                <h1>Notifications</h1>
                <DotsIcon/>
            </div>
            <div className="notificationsBox">
            { notifications.map(item=><NotificationCard key={item.notificationID} {...item}/>)   }
            </div>
        </div>
    )
}

export default Notifications

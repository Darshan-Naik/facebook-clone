import React from 'react'
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import {ReactComponent as MarkIcon} from  "../../Icons/mark.svg"
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import NotificationCard from './NotificationCard'
import { database } from '../../Firebase/firebase'
import useVisibility from '../../Hooks/useVisibility'
import PopUp from '../../SharedComponents/PopUp'

function Notifications({notifications,uid}) {
        const[menu,toggleMenu] = useVisibility()

        const handleClearAll =()=>{
            toggleMenu()
            notifications.map(({notificationID})=>{
                database.collection('users').doc(uid).collection("notifications").doc(notificationID).delete()
            })
        }
        const handleReadAll =()=>{
            toggleMenu()
            notifications.map(({notificationID})=>{
                database.collection('users').doc(uid).collection("notifications").doc(notificationID).update({isRead:true})
            })
        }
    return (
        <div className="notificationsContainer" >
            <PopUp className="notificationsHeader flexBox" >
                <h1>Notifications</h1>
                <div className="notificationMenuBox flexBox">
                    <DotsIcon onClick={toggleMenu}  />
                    {notifications.length? menu && <PopUp className="notificationMenu">
                        <div className="notificationMenuOption flexBox" onClick={handleReadAll}>
                            <MarkIcon />
                            <p>Mark all as read</p>
                        </div>
                        <div className="notificationMenuOption flexBox" onClick={handleClearAll}>
                            <CloseIcon />
                            <p>clear all notifications</p>
                        </div>

                        
                        </PopUp>:null}
                </div>
                
            </PopUp>
            <div className="notificationsBox flexBox scroll">
                {!notifications.length? <p className="noNotifications">No notifications</p>:null}
            { notifications.map(item=><NotificationCard key={item.notificationID} {...item}/>)   }
            </div>
        </div>
    )
}

export default Notifications

import React from 'react'
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import {ReactComponent as MarkIcon} from  "../../Icons/mark.svg"
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import NotificationCard from './NotificationCard'
import { database } from '../../Firebase/firebase'
function Notifications({notifications,uid}) {
        const[menuVisibility,setMenuVisibility] = React.useState(false)

        const handleClearAll =()=>{
            notifications.map(({notificationID})=>{
                database.collection('users').doc(uid).collection("notifications").doc(notificationID).delete()
            })
        }
        const handleReadAll =()=>{
            notifications.map(({notificationID})=>{
                database.collection('users').doc(uid).collection("notifications").doc(notificationID).update({isRead:true})
            })
        }
        const handleMenuVisibility = (e)=>{
            e.stopPropagation()
            setMenuVisibility(!menuVisibility)
        }
    return (
        <div className="notificationsContainer" >
            <div className="notificationsHeader flexBox" >
                <h1 onClick={(e)=> e.stopPropagation()}>Notifications</h1>
                <div className="notificationMenuBox flexBox">
                    <DotsIcon onClick={handleMenuVisibility}  />
                    {notifications.length? menuVisibility && <div className="notificationMenu">
                        <div className="notificationMenuOption flexBox" onClick={handleReadAll}>
                            <MarkIcon />
                            <p>Mark all as read</p>
                        </div>
                        <div className="notificationMenuOption flexBox" onClick={handleClearAll}>
                            <CloseIcon />
                            <p>clear all notifications</p>
                        </div>

                        
                        </div>:null}
                </div>
                
            </div>
            <div className="notificationsBox flexBox scroll">
                {!notifications.length? <p className="noNotifications">No notifications</p>:null}
            { notifications.map(item=><NotificationCard key={item.notificationID} {...item}/>)   }
            </div>
        </div>
    )
}

export default Notifications

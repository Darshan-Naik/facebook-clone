import React from 'react'
import { useSelector } from 'react-redux'
import {ReactComponent as LikeIcon} from  "../../Icons/like.svg"
function NotificationCard({notificationID,tag,author,action,time,isRead,comment}) {
    const [useDetails,setUserDetails] = React.useState({})
    const users = useSelector(store=>store.app.users)
    React.useEffect(()=>{
        const user = users.filter(item=>item.uid === author)
        setUserDetails(user[0])
    })
    return (
        <div className="notificationCardBox flexBox">
            <div className="notificationAuthorImage">
                <img src={useDetails?.profilePic} alt="profilePic" />
               <div className="tagIconWrap flexBox">
               <LikeIcon/>
                   </div>
            </div>
            <div className="notificationDetails">
                <h4>{}</h4>
            </div>
        </div>
    )
}

export default NotificationCard

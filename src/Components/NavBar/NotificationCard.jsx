import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { database } from '../../Firebase/firebase'
import {ReactComponent as LikeIcon} from  "../../Icons/likeBlue.svg"
import StatusDot from '../../SharedComponents/StatusDot'
import timeConverter from '../../Utils/timeConverter'
function NotificationCard({notificationID,tag,author,action,time,isRead,comment}) {
    const [userDetails,setUserDetails] = React.useState({})
    const uid = useSelector(store=>store.auth.user.uid)
    const users = useSelector(store=>store.app.users)
    const history =useHistory()
    React.useEffect(()=>{
        const user = users.filter(item=>item.uid === author)
        setUserDetails(user[0])
    })

    const handleNotificationRead =()=>{
        history.push(`/profile/${author}`)
        database.collection("users").doc(uid).collection("notifications").doc(notificationID).update({isRead:true})
    }
    return (
        <div className="notificationCardBox flexBox" onClick={handleNotificationRead}>
            <div className="notificationAuthorImage">
                <img src={userDetails?.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="profilePic" />
                {tag === "like"? <LikeIcon/> : tag === "comment"? <img src={process.env.PUBLIC_URL +"/images/comment.png"} alt="logo" className="imageIcon" /> :tag === "friend"? <img src={process.env.PUBLIC_URL +"/images/friend.png"} alt="logo" className="imageIcon" /> :null }
            </div>
            <div className="notificationDetails">
                <h5>{`${userDetails?.first_name} ${userDetails?.last_name}`} <span>{action}</span> {comment &&  <small>{` -"${comment}"`}</small>} </h5>
                 <p>{timeConverter(time)}</p>
            </div>

         {!isRead &&  <StatusDot color="#1877f2" width="15px" height="15px" bottom={15}/>}
        </div>
    )
}

export default NotificationCard

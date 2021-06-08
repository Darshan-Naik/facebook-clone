import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { database } from '../../Firebase/firebase'
import StatusDot from '../../SharedComponents/StatusDot'

function UserDetails({time="Active Now"}) {

    const {chatID} = useParams()
    const uid = useSelector(store=>store.auth.user.uid)
    const [senderData,setSenderData] = React.useState(null)
    React.useEffect(()=>{

       database.collection("chatRooms").doc(chatID).get()
       .then((docRef) =>{ 
           const data = docRef.data()
        const  sendID = data.authors.filter(item=> item !==uid)
        database.collection("users").doc(sendID[0]).get()
        .then((docRef) =>{         
            setSenderData( docRef.data()) 
     
     })
    })

    },[chatID,uid])
    return (
        <div className="chatRoomUserDetailsContainer flexBox scroll">
            <div className="chatRoomUserDetailsImage">
                <StatusDot   width= "18px" height= "18px" right="15px"/>
                <img src={senderData?.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
            </div>
            <div className="chatRoomUserDetailsData">
                <p>{`${senderData?.first_name} ${senderData?.last_name}`}</p>
                <small>{time}</small>
            </div>
            
        </div>
    )
}

export default UserDetails

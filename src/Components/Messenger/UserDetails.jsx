import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { database } from '../../Firebase/firebase'
import StatusDot from '../../SharedComponents/StatusDot'
import checkActive from '../../Utils/checkActive'

function UserDetails({}) {
    const [activeState,setActiveState]=React.useState(false);
    const {chatID} = useParams()
    const uid = useSelector(store=>store.auth.user.uid)
    const [senderData,setSenderData] = React.useState(null)
    React.useEffect(()=>{
        let unsubscribe ;
       database.collection("chatRooms").doc(chatID).get()
        .then((docRef) =>{ 
            const data = docRef.data()
            const  sendID = data.authors.filter(item=> item !==uid)
            unsubscribe =  database.collection("users").doc(sendID[0]).onSnapshot(docRef =>{         
                setSenderData( docRef.data())                
        })
        })
            return()=>{
                unsubscribe()
            }
    },[chatID,uid])
 
   
   
    React.useEffect(()=>{
        if(senderData?.activeStatus){
            if(checkActive(senderData?.activeStatus)==="Active Now"){
                setActiveState(true);
            }else{
                setActiveState(false);
            }

        }
        
    },[senderData?.activeStatus])
    return (
        <div className="chatRoomUserDetailsContainer flexBox scroll">
            <div className="chatRoomUserDetailsImage">
            {activeState &&    <StatusDot   width= "18px" height= "18px" right="15px"/>}
                <img src={senderData?.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
            </div>
            <div className="chatRoomUserDetailsData">
                <p>{`${senderData?.first_name} ${senderData?.last_name}`}</p>
                <small>{checkActive(senderData?.activeStatus)}</small>
            </div>
            
        </div>
    )
}

export default UserDetails

import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { database } from '../../Firebase/firebase'
import StatusDot from '../../SharedComponents/StatusDot'
import checkActive from '../../Utils/checkActive'
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'
function UserDetails({}) {
    const [activeState,setActiveState]=React.useState(false);
    const {chatID} = useParams()
    const uid = useSelector(store=>store.auth.user.uid)
    const [senderData,setSenderData] = React.useState(null)
    const dark = useSelector(store=>store.theme.dark)
    const history = useHistory()
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
                setSenderData(null)
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
    return senderData? (
        <div className="chatRoomUserDetailsContainer flexBox scroll">
            <div className="chatRoomUserDetailsImage" onClick={()=>history.push(`/profile/${senderData?.uid}`) }>
            {activeState &&    <StatusDot   width= "18px" height= "18px" right="15px"/>}
                <img src={senderData?.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
            </div>
            <div className="chatRoomUserDetailsData" onClick={()=>history.push(`/profile/${senderData?.uid}`) }>
                <p>{`${senderData?.first_name} ${senderData?.last_name}`}</p>
                <small>{checkActive(senderData?.activeStatus)}</small>
            </div>
            
        </div>
    ) : ( <div className="chatRoomUserDetailsContainer flexBox scroll">
        <SkeletonTheme width={200} color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"} > 
            <div className="flexBox" style={{flexDirection:"column"}}>
                <Skeleton style={{margin:"0 5px"}} circle={true} height={100} width={100} />
                <Skeleton style={{borderRadius:"25px"}} width={130} height={15}/>
                <Skeleton style={{borderRadius:"25px"}} width={100} height={10}/>
            </div>
    </SkeletonTheme>
    </div>
    )
}

export default UserDetails

import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { database } from '../../Firebase/firebase';
import { addActiveMessage } from '../../Redux/App/actions';
import checkActive from '../../Utils/checkActive';
import SideBarContent from './SideBarContent'
import ActiveContactsSkeleton from './Skeleton/ActiveContactsSkeleton';

function ActiveContacts({friendId}) {
    const [activeState,setActiveState]=React.useState(false);
const [userDetails,setUserDetails] = React.useState(null)
const uid = useSelector(store=>store.auth.user.uid)
const chatRooms = useSelector(store=>store.app.chatRooms) 
const dispatch = useDispatch()
React.useEffect(()=>{
        const unsubscribe = database.collection("users").doc(friendId)
        .onSnapshot((doc) => {
            setUserDetails(doc.data());
        });
        return () => {
            unsubscribe();
        }
},[])
React.useEffect(()=>{
    if(userDetails?.activeStatus){
        if(checkActive(userDetails?.activeStatus)==="Active Now"){
            setActiveState(true);
        }else{
            setActiveState(false);
        }

    }
    
},[userDetails?.activeStatus])
const handleChat =()=>{
    if(userDetails){

            if(JSON.stringify(chatRooms).includes(friendId)){
                const chatRoom = chatRooms.filter((item)=>JSON.stringify(item).includes(friendId))
                dispatch(addActiveMessage(chatRoom[0]))
            } else {
                const payload = {
                    authors : [friendId,uid]
                }
                database.collection("chatRooms").add(payload).then((res)=>{
                    database.collection("chatRooms").doc(res.id).onSnapshot(res=>{
                        dispatch(addActiveMessage({chatID : res.id,...res.data()}))
                    })
                })
            }
        }
}
    return userDetails? (
        <div className="flexBox sideBarContentLink" onClick={handleChat}>
           <SideBarContent label={`${userDetails?.first_name} ${userDetails?.last_name}`} src={userDetails?.profilePic} active={activeState} /> 
        </div>
    ) : (<div className="flexBox sideBarContentLink"> 
            <ActiveContactsSkeleton />
        </div>)
}

export default ActiveContacts

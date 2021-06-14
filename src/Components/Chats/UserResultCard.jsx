import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { database } from '../../Firebase/firebase'
import { addActiveMessage } from '../../Redux/App/actions'

function UserResultCard({first_name,last_name,uid : friendId,profilePic,toggleNewChatBox}) {
    const uid = useSelector(store=>store.auth.user.uid)
    const chatRooms = useSelector(store=>store.app.chatRooms)
     const dispatch = useDispatch()
    const handleChat =()=>{
        
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
        toggleNewChatBox()
    }
    return (
        <div className="newChatBoxResultCard flexBox" onClick={handleChat}>
            <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="pic" />
            <p>{`${first_name} ${last_name}`}</p> 
        </div>
    )
}

export default UserResultCard

import React from 'react'
import {useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { database } from '../../Firebase/firebase'


function UserResultCard({first_name,last_name,uid : friendId,profilePic,setQuery}) {
    const uid = useSelector(store=>store.auth.user.uid)
    const chatRooms = useSelector(store=>store.app.chatRooms)
     const history = useHistory()
    const handleChat =()=>{
        if(JSON.stringify(chatRooms).includes(friendId)){
            const chatRoom = chatRooms.filter((item)=>JSON.stringify(item).includes(friendId))
            history.push(`/messenger/${chatRoom[0].chatID}`)
            setQuery("")
        } else {
            const payload = {
                authors : [friendId,uid]
            }
            database.collection("chatRooms").add(payload).then((res)=>{
                database.collection("chatRooms").doc(res.id).onSnapshot(res=>{
                    history.push(`/messenger/${res.id}`)
                    setQuery("")
                })
            })
        }
       
    }
    return (
        <div className="newChatBoxResultCard flexBox" onClick={handleChat}>
            <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="pic" />
            <p>{`${first_name} ${last_name}`}</p> 
        </div>
    )
}

export default UserResultCard

import React from 'react'
import { useSelector } from 'react-redux'
import { database } from '../../Firebase/firebase'
import ChatBoxHeader from './ChatBoxHeader'
import ChatBoxInput from './ChatBoxInput'
import Message from './Message'

function ChatBox({chatID,authors,active,handleActiveChatBox,index}) {
    const [messages,setMessages] = React.useState([])
    const uid = useSelector(store=>store.auth.user.uid)
    React.useEffect(()=>{
        database.collection("chatRooms").doc(chatID).collection("messages").orderBy("time","asc")
        .onSnapshot(snapshot=>{
            setMessages(snapshot.docs.map(doc=>{
            if(doc.data().author !==uid && !doc.data().isRead){
                database.collection("chatRooms").doc(chatID).collection("messages").doc(doc.id).update({isRead:true})
            } 
            
           return {id:doc.id,...doc.data()}
        }))

    })
    },[])
    return (
        <div className={`chatBoxContainer flexBox ${active && "activeBox"}`} onClick={()=>handleActiveChatBox(index)}>
            <ChatBoxHeader  authors={authors} />
            <div className="chatMessages scroll">
                <div className="fillBox">

                </div>

                {messages.map(message=><Message key={message.id} {...message} uid={uid} />)}

            </div>
            <ChatBoxInput active={active} chatID={chatID} uid={uid} />
        </div>
    )
}

export default ChatBox

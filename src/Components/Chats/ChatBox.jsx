import React from 'react';
import { useSelector } from 'react-redux';
import { database } from '../../Firebase/firebase';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxInput from './ChatBoxInput';
import Message from './Message';
import UserDetailsCard from '../../SharedComponents/UserDetailsCard';
import useVisibility from '../../Hooks/useVisibility';

function ChatBox({chatID,authors,active,handleActiveChatBox,index}) {
    const [emojiMart,toggleEmojiMart,closeEmojiMart] = useVisibility()
    const [messages,setMessages] = React.useState([])
    const [userDetails,setUserDetails] = React.useState({})
    const scroll = React.useRef()
    const uid = useSelector(store=>store.auth.user.uid)

    React.useEffect(()=>{
      const unsubscribe =   database.collection("chatRooms").doc(chatID).collection("messages").orderBy("time","asc")
        .onSnapshot(snapshot=>{
            setMessages(snapshot.docs.map(doc=>{
            if(doc.data().author !==uid && !doc.data().isRead){
                database.collection("chatRooms").doc(chatID).collection("messages").doc(doc.id).update({isRead:true})
            } 
            
           return {id:doc.id,...doc.data()}
        }))

    })

    return ()=>{
        unsubscribe()
    }

    },[chatID,uid])

    React.useEffect(()=>{
        const senderID = authors.filter(id=>id !==uid)
            const unsubscribe = database.collection("users").doc(senderID[0])
            .onSnapshot((doc) => {
                setUserDetails(doc.data());             
            });
            return () => {
                unsubscribe();
            }

    },[uid,authors])

    React.useEffect(()=>{
        scroll.current.scroll(0,200000)
    },[messages])
    
    return (
        <div className={`chatBoxContainer flexBox ${active && "activeBox"}`} onClick={()=>{handleActiveChatBox(index);closeEmojiMart()}}>
            <ChatBoxHeader  userDetails={userDetails} chatID={chatID}/>
            <div className="chatMessages scroll" ref={scroll}>
                <div className="fillBox">
                    <UserDetailsCard {...userDetails} />
                </div>

                {messages.map(message=><Message key={message.id} {...message} uid={uid} />)}

            </div>
            <ChatBoxInput emojiMart={emojiMart} toggleEmojiMart={toggleEmojiMart} active={active} chatID={chatID} uid={uid} />
        </div>
    )
}

export default ChatBox

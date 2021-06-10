import React from 'react'
import ChatBodyHeader from './ChatBodyHeader'
import ChatBodyInput from './ChatBodyInput'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { database } from '../../Firebase/firebase'
import {ReactComponent as StatePeople} from  "../../Icons/states_people.svg"
import Message from './Message'
function ChatRoomBody({handleUserDetailsVisibility,data}) {
    const {chatID} = useParams()
    const scroll = React.useRef()
    const [messages,setMessages] = React.useState([])
    const uid = useSelector(store=>store.auth.user.uid)
    const [senderData,setSenderData] = React.useState(null)
    React.useEffect(()=>{
       let unsubscribe;
        if(chatID !=="new") {
            database.collection("chatRooms").doc(chatID).get()
                .then((docRef) =>{ 
                    const data = docRef.data()
                    const  sendID = data.authors.filter(item=> item !==uid)
                    database.collection("users").doc(sendID[0]).get()
                    .then((docRef) =>{         
                        setSenderData( docRef.data())                
                })
                })
          unsubscribe = database.collection("chatRooms").doc(chatID).collection("messages").orderBy("time","asc")
                .onSnapshot(snapshot=>{
                    setMessages(snapshot.docs.map(doc=>{
                    if(doc.data().author !==uid && !doc.data().isRead){
                        database.collection("chatRooms").doc(chatID).collection("messages").doc(doc.id).update({isRead:true})
                    }       
                return {id:doc.id,...doc.data()}
                }))
            })

            
        }
        return()=>{
          unsubscribe && unsubscribe();
        }
    },[chatID,uid])
    React.useEffect(()=>{
        if(chatID !=="new") {
        scroll.current.scroll(0,200000)
        }
    },[messages,chatID])
    return chatID !== "new"? (
        <div className="chatRoomBodyContainer flexBox" >
           <ChatBodyHeader handleUserDetailsVisibility={handleUserDetailsVisibility} {...senderData} />
           <div className="chatRoomMessageBox scroll" ref={scroll}>
               <div className="messengerFillBox">

               </div>
           {messages.map(message=><Message key={message.id} {...message} uid={uid} />)}
           </div>
           <ChatBodyInput chatID={chatID} uid={uid} />
        </div>
    ) : (<div className="flexBox newMessengerWelcomeBox">
        <StatePeople/>
        <h2>Select people's names to preview their Messages.</h2>
        </div>)
}

export default ChatRoomBody

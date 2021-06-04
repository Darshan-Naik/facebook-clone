import React from 'react'
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg"
import {ReactComponent as CreateFilledIcon} from  "../../Icons/createFilled.svg"
import {ReactComponent as LikeIcon} from  "../../Icons/like.svg"
import {ReactComponent as PhotosIcon} from  "../../Icons/photos.svg"
import { database } from '../../Firebase/firebase'

function ChatBoxInput({chatID,uid}) {
    const [iconVisibility,setIconVisibility] = React.useState(true)
    const [text,setText] =React.useState("") 
    React.useEffect(()=>{
        if(text){
            setIconVisibility(false)
        } else {
            setIconVisibility(true)
        }
    },[text])

    const handleSend=(e)=>{
        if(e.keyCode == 13 && text){
            const payload ={
                text,
                time : new Date(),
                author : uid,
                isRead : false
            }
            database.collection("chatRooms").doc(chatID).collection("messages").add(payload)
            .then(()=>{
                setText("")
            })
        }

    }
    return (
        <div className={`chatBoxInputContainer flexBox`}>
            <CreateFilledIcon />
             { iconVisibility && <>  <PhotosIcon /> </>}
            <div className="chatBoxInput flexBox">
                <input  type="text"  value={text} placeholder="Aa" autoFocus onChange={(e)=>setText(e.target.value)} onKeyDown={handleSend}/>
                <EmojiIcon />
            </div>
            <LikeIcon />
        </div>
    )
}

export default ChatBoxInput

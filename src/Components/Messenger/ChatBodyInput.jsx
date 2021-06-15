import React from 'react'
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg"
import {ReactComponent as CreateFilledIcon} from  "../../Icons/createFilled.svg"
import {ReactComponent as LikeIcon} from  "../../Icons/like.svg"
import {ReactComponent as PhotosIcon} from  "../../Icons/photos.svg"
import EmojiMart from '../../SharedComponents/EmojiMart'
import { database } from '../../Firebase/firebase'
import useVisibility from '../../Hooks/useVisibility'
import PopUp from '../../SharedComponents/PopUp'

function ChatBodyInput({chatID,uid}) {
    const [text,setText] =React.useState("") 
    const [emojiMart,toggleEmojiMart] = useVisibility()
    const handleSend=(e)=>{
        if(e.keyCode === 13 && text){
            const payload ={
                text,
                time : new Date(),
                author : uid,
                isRead : false
            }
            database.collection("chatRooms").doc(chatID).collection("messages").add(payload)
            setText("")
        } 
    }
    const handleSendLike=()=>{
            const payload ={
                text: "👍",
                time : new Date(),
                author : uid,
                isRead : false
            }
            database.collection("chatRooms").doc(chatID).collection("messages").add(payload)
    }
    const handleEmoji=(emoji)=>{
        setText(text + emoji.native)
    }
    return (
        <>
        <div className="chatBodyInputContainer flexBox">
        <CreateFilledIcon />
          <PhotosIcon /> 
        <div className="chatBodyInput flexBox">
            <input  type="text"  value={text} placeholder="Aa" autoFocus onChange={(e)=>setText(e.target.value)} onKeyDown={handleSend} />
            <EmojiIcon onClick={toggleEmojiMart} />
        </div>
        <LikeIcon onClick={handleSendLike}/>
    </div>
  {emojiMart && <PopUp><EmojiMart handleEmoji={handleEmoji} /> </PopUp> }
    </>
    )
}

export default ChatBodyInput

import React from 'react'
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg"
import {ReactComponent as CreateFilledIcon} from  "../../Icons/createFilled.svg"
import {ReactComponent as LikeIcon} from  "../../Icons/like.svg"
import {ReactComponent as PhotosIcon} from  "../../Icons/photos.svg"
import { database } from '../../Firebase/firebase'
import EmojiMart from "../../SharedComponents/EmojiMart"
function ChatBoxInput({active,chatID,uid}) {
    const [inputBoxIcon,setInputBoxIcon] = React.useState(true)
    const [emojiMartVisibility,setEmojiMartVisibility] = React.useState(false)
    const [text,setText] =React.useState("") 
    React.useEffect(()=>{
        if(text){
            setInputBoxIcon(false)
        } else {
            setInputBoxIcon(true)
        }
    },[text])

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
            setEmojiMartVisibility(false)
        }
    return (
        <div className={`chatBoxInputContainer flexBox`}>
            <CreateFilledIcon />
             { inputBoxIcon && <>  <PhotosIcon /> </>}
            <div className="chatBoxInput flexBox">
                <input  type="text"  value={text} placeholder="Aa" autoFocus onChange={(e)=>setText(e.target.value)} onKeyDown={handleSend}/>
                <div className="flexBox chatBoxEmojiContainer">
                {emojiMartVisibility && active && <div className="chatBoxEmojiMart">
                    <EmojiMart handleEmoji={handleEmoji} />
                </div>}
                <EmojiIcon onClick={()=>setEmojiMartVisibility(!emojiMartVisibility)} />
                </div>  
            </div>
            <div className="flexBox chatBoxInputLikeButton">
             <LikeIcon  onClick={handleSendLike}/>
            </div>
            
        </div>
    )
}

export default ChatBoxInput

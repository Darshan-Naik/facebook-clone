import React from 'react'
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg"
import {ReactComponent as CreateFilledIcon} from  "../../Icons/createFilled.svg"
import {ReactComponent as LikeIcon} from  "../../Icons/like.svg"
import {ReactComponent as PhotosIcon} from  "../../Icons/photos.svg"

function ChatBoxInput() {
    const [iconVisibility,setIconVisibility] = React.useState(true)
    const [text,setText] =React.useState("") 
    React.useEffect(()=>{
        if(text){
            setIconVisibility(false)
        } else {
            setIconVisibility(true)
        }
    },[text])
    return (
        <div className={`chatBoxInputContainer flexBox`}>
            <CreateFilledIcon />
             { iconVisibility && <>  <PhotosIcon /> </>}
            <div className="chatBoxInput flexBox">
                <input  type="text"  value={text} placeholder="Aa" autoFocus onChange={(e)=>setText(e.target.value)} />
                <EmojiIcon />
            </div>
            <LikeIcon />
        </div>
    )
}

export default ChatBoxInput

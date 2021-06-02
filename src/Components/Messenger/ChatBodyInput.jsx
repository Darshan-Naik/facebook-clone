import React from 'react'
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg"
import {ReactComponent as CreateFilledIcon} from  "../../Icons/createFilled.svg"
import {ReactComponent as LikeIcon} from  "../../Icons/like.svg"
import {ReactComponent as PhotosIcon} from  "../../Icons/photos.svg"

function ChatBodyInput() {
    const [text,setText] =React.useState("") 
    return (
        <div className="chatBodyInputContainer flexBox">
        <CreateFilledIcon />
          <PhotosIcon /> 
        <div className="chatBodyInput flexBox">
            <input  type="text"  value={text} placeholder="Aa" autoFocus onChange={(e)=>setText(e.target.value)} />
            <EmojiIcon />
        </div>
        <LikeIcon />
    </div>
    )
}

export default ChatBodyInput

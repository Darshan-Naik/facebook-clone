import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import React from 'react'

function EmojiMart({handleEmoji}) {
    return (<Picker set='google'   onClick={handleEmoji}/>)
}

export default EmojiMart

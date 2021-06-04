import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../../Styles/Chats/Chats.css"
import ActiveChatBubble from './ActiveChatBubble'
import ChatBox from './ChatBox'
import ChatBubble from './ChatBubble'
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import {ReactComponent as MinimizeIcon} from  "../../Icons/minimize.svg"
import { closeAllMessage, minimizeAllMessage } from '../../Redux/App/actions'
function Chats() {
    const [optionVisibility,setOptionVisibility] = React.useState(false)
    const [optionVisibilityBox,setOptionVisibilityBox] = React.useState(false)
    const {activeMessages,inActiveMessages} = useSelector(store=>store.app)
    const [activeChatIndex,setActiveChatIndex] = React.useState(0)
    const dispatch = useDispatch()

    const handleActiveChatBox = (index)=>{
        setActiveChatIndex(index)
    }
    const handleOption =()=>{
        setOptionVisibilityBox(!optionVisibilityBox)
        setOptionVisibility(true)
    }
    const handleCloseAll = ()=>{
        dispatch(closeAllMessage())
    }
    const handleMinimize = ()=>{
        dispatch(minimizeAllMessage())
    }
    return (
        <> 
        <div className="activeChatBubbleContainer" onMouseEnter={()=>setOptionVisibility(true)} onMouseLeave={()=>!optionVisibilityBox && setOptionVisibility(false)}>
           {optionVisibility && (activeMessages.length || inActiveMessages.length ) ? <div className="bubbleOptions flexBox" onClick={handleOption}>
            <DotsIcon/>
           {optionVisibilityBox && <div className="bubbleOptionBox">
                <div className="flexBox bubbleOptionIconBox" onClick={handleCloseAll}>
                    <CloseIcon />
                    <p>Close all chats</p>
                </div>
                <div className="flexBox bubbleOptionIconBox" onClick={handleMinimize}>
                    <MinimizeIcon />
                    <p>Minimize Open chats</p>
                </div>
            </div>}

            </div> : null}
            <div className="activeChatBubbleBox">
            {inActiveMessages.map(({userDetails,chatId},i)=><ActiveChatBubble chatId={chatId} {...userDetails} />)}
            </div>
            <ChatBubble />
            <div className="chatsContainer flexBox">
            {activeMessages.map((chatRoom,i)=><ChatBox key={chatRoom.chatID} {...chatRoom} active={activeChatIndex === i} handleActiveChatBox={handleActiveChatBox} index={i}/>)}
        </div>
        </div>
        
        </>
    )
}

export default Chats

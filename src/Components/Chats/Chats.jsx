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
import NewChatBox from './NewChatBox'
import useVisibility from '../../Hooks/useVisibility'
import PopUp from '../../SharedComponents/PopUp'
function Chats() {
    const [option,,closeOption,openOption] = useVisibility()
    const [optionBox,toggleOptionBox] = useVisibility()
    const {activeMessages,inActiveMessages} = useSelector(store=>store.app)
    const [activeChatIndex,setActiveChatIndex] = React.useState(0)
    const [newChatBox,toggleNewChatBox] = useVisibility()

    const dispatch = useDispatch()
    const handleActiveChatBox = (index)=>{
        setActiveChatIndex(index)
    }
    const handleOption =()=>{
        toggleOptionBox()
        openOption()
    }
    const handleCloseAll = ()=>{
        dispatch(closeAllMessage())
        toggleOptionBox()
    }
    const handleMinimize = ()=>{
        dispatch(minimizeAllMessage())
        toggleOptionBox()
    }
    return (
        <> 
        <PopUp className="activeChatBubbleContainer" onMouseEnter={openOption} onMouseLeave={()=>!optionBox && closeOption()}  >
           {option && (activeMessages.length || inActiveMessages.length ) ? <PopUp className="bubbleOptions flexBox" onClick={handleOption}>
            <DotsIcon/>
           {optionBox && <PopUp className="bubbleOptionBox" >
                <div className="flexBox bubbleOptionIconBox" onClick={handleCloseAll}>
                    <CloseIcon />
                    <p>Close all chats</p>
                </div>
                <div className="flexBox bubbleOptionIconBox" onClick={handleMinimize}>
                    <MinimizeIcon />
                    <p>Minimize Open chats</p>
                </div>
            </PopUp>}

            </PopUp> : null}
            <div className="activeChatBubbleBox" >
            {inActiveMessages.map((chatRoom,i)=><ActiveChatBubble key={chatRoom.chatID} {...chatRoom} />)}
            </div>
            <ChatBubble toggleNewChatBox={toggleNewChatBox}/>
            <div className="chatsContainer flexBox">
            {activeMessages.map((chatRoom,i)=><ChatBox key={chatRoom.chatID} {...chatRoom} active={activeChatIndex === i} handleActiveChatBox={handleActiveChatBox} index={i}/>)}
          {newChatBox &&  <NewChatBox toggleNewChatBox={toggleNewChatBox}/>}
        </div>
        </PopUp>
        
        </>
    )
}

export default Chats

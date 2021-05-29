import React from 'react'
import StatusDot from '../../SharedComponents/StatusDot'
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import { useDispatch } from 'react-redux'
import { addInActiveMessageToActiveMessage, removeInActiveMessage } from '../../Redux/App/actions'


function ActiveChatBubble({chatId,profilePic,first_name}) {
    const [closeButtonVisibility,setCloseButtonVisibility] = React.useState(false)
    const dispatch = useDispatch()
    const handleClose =()=>{
        dispatch(removeInActiveMessage(chatId))
    }

    const handleUpdate =()=>{
        dispatch(addInActiveMessageToActiveMessage(chatId))
    }
    return (
        <div onClick={handleUpdate} className="activeChatBubble" onMouseEnter={()=>setCloseButtonVisibility(true)} onMouseLeave={()=>setCloseButtonVisibility(false)}>
          {closeButtonVisibility &&  <div className="activeChatBubbleCloseButton flexBox">
                 <CloseIcon onClick={handleClose}/>
            </div>}
            <StatusDot width="15px" height="15px" />
            <img  src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}  alt="User" />
        </div>
    )
}

export default ActiveChatBubble

import React from 'react'
import StatusDot from '../../SharedComponents/StatusDot'
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import { useDispatch, useSelector } from 'react-redux'
import { addInActiveMessageToActiveMessage, removeInActiveMessage } from '../../Redux/App/actions'


function ActiveChatBubble({chatID,authors}) {

    const users = useSelector(store=>store.app.users)
    const uid = useSelector(store=>store.auth.user.uid)
    const [useDetails,setUserDetails] = React.useState({})

    React.useEffect(()=>{
        const senderID = authors.filter(id=>id !==uid)
        const user = users.filter(item=>item.uid === senderID[0])
        setUserDetails(user[0])
    },[authors,users,uid])

    const [closeButtonVisibility,setCloseButtonVisibility] = React.useState(false)
    const dispatch = useDispatch()
    const handleClose =()=>{
        dispatch(removeInActiveMessage(chatID))
    }

    const handleUpdate =()=>{
        dispatch(addInActiveMessageToActiveMessage(chatID))
    }
    return (
        <div onClick={handleUpdate} className="activeChatBubble" onMouseEnter={()=>setCloseButtonVisibility(true)} onMouseLeave={()=>setCloseButtonVisibility(false)}>
          {closeButtonVisibility &&  <div className="activeChatBubbleCloseButton flexBox">
                 <CloseIcon onClick={handleClose}/>
            </div>}
            <StatusDot width="15px" height="15px" />
            <img  src={useDetails?.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}  alt="User" />
        </div>
    )
}

export default ActiveChatBubble

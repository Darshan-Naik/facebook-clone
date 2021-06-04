import React from 'react'
import StatusDot from "../../SharedComponents/StatusDot"
import {ReactComponent as MinimizeIcon} from  "../../Icons/minimize.svg"
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import { useDispatch, useSelector } from 'react-redux'
import { addInActiveMessage, removeActiveMessage } from '../../Redux/App/actions'
function ChatBoxHeader({chatID,authors,activeStatus}) {
    
    const users = useSelector(store=>store.app.users)
    const uid = useSelector(store=>store.auth.user.uid)
    const [useDetails,setUserDetails] = React.useState({})

    React.useEffect(()=>{
        const senderID = authors.filter(id=>id !==uid)
        const user = users.filter(item=>item.uid === senderID[0])
        setUserDetails(user[0])
    })

    const dispatch = useDispatch()
    const handleClose =()=>{
        dispatch(removeActiveMessage(chatID))
    }
    const handleMinimize =()=>{
        dispatch(addInActiveMessage(chatID))
    }
    return (
        <div className="chatBoxHeader flexBox">
            <div className="chatBoxUser flexBox">     
                <div className="chatBoxUserImage">
                        <img  src={useDetails.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}  alt="User" />
                        <StatusDot bottom={5} right={2} width="12px" height="12px"/>
                </div>
                <div className="chatBoxUserDetails flexBox">
                    <h4>{ useDetails.first_name? `${useDetails.first_name} ${useDetails.last_name}` : "User"}</h4>
                    <small>{activeStatus || "While ago"}</small>
                </div>
            </div>
            <div className="chatBoxHeaderIcons flexBox">
                <MinimizeIcon onClick={handleMinimize}/>
                <CloseIcon onClick={handleClose} />
            </div>
        </div>
    )
}

export default ChatBoxHeader

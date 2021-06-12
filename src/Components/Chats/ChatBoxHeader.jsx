import React from 'react'
import StatusDot from "../../SharedComponents/StatusDot"
import {ReactComponent as MinimizeIcon} from  "../../Icons/minimize.svg"
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import { useDispatch, useSelector } from 'react-redux'
import { addInActiveMessage, removeActiveMessage } from '../../Redux/App/actions'
import checkActive from '../../Utils/checkActive'
import { useHistory } from 'react-router-dom'
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'
function ChatBoxHeader({chatID,userDetails}) {
    const dark = useSelector(store=>store.theme.dark)
    const [activeState,setActiveState]=React.useState(false);
   const history = useHistory();
   
    React.useEffect(()=>{
        if(userDetails?.activeStatus){
            if(checkActive(userDetails?.activeStatus)==="Active Now"){
                setActiveState(true);
            }else{
                setActiveState(false);
            }

        }
        
    },[userDetails?.activeStatus])
 

    const dispatch = useDispatch()
    const handleClose =()=>{
        dispatch(removeActiveMessage(chatID))
    }
    const handleMinimize =()=>{
        dispatch(addInActiveMessage(chatID))
    }
    return (
        <div className="chatBoxHeader flexBox">
         { userDetails.first_name ? ( <div className="chatBoxUser flexBox" onClick={()=>history.push(`/profile/${userDetails?.uid}`)}>     
                <div className="chatBoxUserImage">
                        <img  src={userDetails.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}  alt="User" />
                      {activeState &&  <StatusDot bottom={5} right={2} width="12px" height="12px"/>}
                </div>
                <div className="chatBoxUserDetails flexBox">
                    <h4>{`${userDetails?.first_name} ${userDetails?.last_name}`}</h4>
                    <small>{checkActive(userDetails?.activeStatus)}</small>
                </div>
            </div> ) :
            ( <div className="chatBoxUser flexBox"><SkeletonTheme width={200} color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"} > 
            <div className="flexBox">
                <Skeleton style={{margin:"0 5px"}} circle={true} height={35} width={35} />
                <Skeleton style={{borderRadius:"25px"}} width={80} height={10}/>
            </div>
            </SkeletonTheme> </div>)}
            <div className="chatBoxHeaderIcons flexBox">
                <MinimizeIcon onClick={handleMinimize}/>
                <CloseIcon onClick={handleClose} />
            </div>
        </div>
    )
}

export default ChatBoxHeader

import React from 'react'
import StatusDot from '../../SharedComponents/StatusDot'
import {ReactComponent as Alert} from  "../../Icons/alert.svg"
import checkActive from '../../Utils/checkActive';


function ChatBodyHeader({handleUserDetailsVisibility,profilePic,first_name,last_name,activeStatus}) {
    const [activeState,setActiveState]=React.useState(false);
   
   
    React.useEffect(()=>{
        if(activeStatus){
            if(checkActive(activeStatus)==="Active Now"){
                setActiveState(true);
            }else{
                setActiveState(false);
            }

        }
        
    },[activeStatus])
    return (
        <div className="chatBodyHeaderContainer flexBox">
            <div className="chatBodyHeaderUserDetails flexBox">
                <div className="chatBodyHeaderUserImage">
                  {activeState &&  <StatusDot />}
                <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
                </div>
                <div className="chatBodyHeaderUserDetailsData flexBox">
                    <p>{`${first_name} ${last_name}`}</p>
                    <small>{checkActive(activeStatus)}</small>
                </div>
            </div>
            <div className="chatBodyHeaderIcons flexBox">
                         <Alert onClick={handleUserDetailsVisibility}/>   
            </div>
        </div>
    )
}

export default ChatBodyHeader

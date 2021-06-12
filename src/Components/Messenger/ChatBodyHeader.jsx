import React from 'react'
import StatusDot from '../../SharedComponents/StatusDot'
import {ReactComponent as Alert} from  "../../Icons/alert.svg"
import checkActive from '../../Utils/checkActive';
import { useHistory } from 'react-router-dom';
import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'
import { useSelector } from 'react-redux';

function ChatBodyHeader({handleUserDetailsVisibility,profilePic,first_name,last_name,activeStatus,uid}) {
    const [activeState,setActiveState]=React.useState(false);
   const history = useHistory()
   const dark = useSelector(store=>store.theme.dark);
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
        {first_name?( <div className="chatBodyHeaderUserDetails flexBox">
                <div className="chatBodyHeaderUserImage" onClick={()=>history.push(`/profile/${uid}`)}>
                  {activeState &&  <StatusDot />}
                <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="User" />
                </div>
                <div className="chatBodyHeaderUserDetailsData flexBox" onClick={()=>history.push(`/profile/${uid}`)}>
                    <p>{`${first_name} ${last_name}`}</p>
                    <small>{checkActive(activeStatus)}</small>
                </div>
            </div> ) :
            (
                <SkeletonTheme width={200} color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"} > 
                    <div className="flexBox">
                        <Skeleton style={{margin:"0 5px"}} circle={true} height={40} width={40} />
                        <Skeleton style={{borderRadius:"25px"}} width={100} height={15}/>
                    </div>
                </SkeletonTheme>
            )}
            <div className="chatBodyHeaderIcons flexBox">
                         <Alert onClick={handleUserDetailsVisibility}/>   
            </div>
        </div>
    )
}

export default ChatBodyHeader

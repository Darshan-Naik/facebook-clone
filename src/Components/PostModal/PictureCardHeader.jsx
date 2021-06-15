import React from 'react';
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import EditBox from '../PostCard/EditBox';
import StatusDot from '../../SharedComponents/StatusDot';
import checkActive from '../../Utils/checkActive';
import useVisibility from '../../Hooks/useVisibility';

function PictureCardHeader({handleFav, handleRemoveFav,id,first_name,last_name,profilePic,time,author,activity,title,postEditFunction,image,activeStatus}) {
   
    const [editSection,toggleEditSection]= useVisibility();
    const [activeState,setActiveState]=React.useState(false);

    const {uid} = useSelector(store=>store.auth.user);
    const history = useHistory();

    let localTime = new Date(time?.toDate()).toString().split(" ");
    localTime.length=4;
    const localTime1 = new Date(time?.toDate()).toLocaleTimeString();
    const checkTime = new Date().toLocaleString().split(",");
    const originalTime = new Date(time?.toDate()).toLocaleDateString().split(",");
    
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
        <div className="postDetailsCardHeadContainer flexBox">
            <div className="postDetailsCardHeadBox1" onClick={()=>history.push(`/profile/${author}`)}>
                <img src={profilePic|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="pic" />
                {activeState&&<StatusDot/>}
            </div>
            <div className="postDetailsCardHeadBox2">
                <div className="postDetailsCardActivity flexBox">
                    <div onClick={()=>history.push(`/profile/${author}`)}>
                        <strong>{`${first_name} ${last_name}`}</strong>
                    </div>
                    {activity&&<div>
                        <span>{activity}</span>
                    </div>} 
                </div>
                
                <div>
                    <span>{checkTime[0]===originalTime[0]?localTime1:`${localTime.join(" ")}, ${localTime1}`}</span>
                </div>
            </div>
            <div className="postDetailsCardHeadBox3 flexBox">
                <DotsIcon onClick={toggleEditSection}/>
                {editSection&&<EditBox toggleEditSection={toggleEditSection} handleRemoveFav={handleRemoveFav} author={author} uid={uid} id={id} first_name={first_name} last_name={last_name} handleFav={handleFav} profilePic={profilePic} title={title} {...postEditFunction} image={image}/>}
            </div>
            
        </div>
    )
}

export default PictureCardHeader

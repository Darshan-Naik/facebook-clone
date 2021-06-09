import React from 'react';
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import { useHistory } from 'react-router';

function PictureCardHeader({first_name,last_name,profilePic,time,uid,activity}) {

    //const localTime = new Date(time?.toDate()).toLocaleString();
    let localTime = new Date(time?.toDate()).toString().split(" ");
    localTime.length=4
    // const date = new Date(time?.toDate()).toLocaleDateString().split("/").join("-");
    const localTime1 = new Date(time?.toDate()).toLocaleTimeString();
 
    
    const history = useHistory();
   

    return (
        <div className="postDetailsCardHeadContainer flexBox">
            <div className="postDetailsCardHeadBox1" onClick={()=>history.push(`/profile/${uid}`)}>
                <img src={profilePic|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="pic" />
            </div>
            <div className="postDetailsCardHeadBox2">
                <div className="postDetailsCardActivity flexBox">
                    <div onClick={()=>history.push(`/profile/${uid}`)}><strong>{`${first_name} ${last_name}`}</strong></div>
                    {activity&&<div><span>{activity}</span></div>} 
                </div>
                
                <div><span>{`${localTime.join(" ")}, ${localTime1}`}</span></div> 
            </div>
            <div className="postDetailsCardHeadBox3 flexBox"><DotsIcon/></div>
            
        </div>
    )
}

export default PictureCardHeader

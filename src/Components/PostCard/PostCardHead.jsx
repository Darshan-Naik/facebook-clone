import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import { useHistory } from 'react-router';
import EditBox from './EditBox';
import { useSelector } from 'react-redux';

function PostCardHead({first_name,last_name,profilePic,time,author,activity}) {

    const [editSection,setEditSection]=React.useState(false);
    const {uid} = useSelector(store=>store.auth.user);
    //const localTime = new Date(time?.toDate()).toLocaleString();
    let localTime = new Date(time?.toDate()).toString().split(" ");
    localTime.length=4
    // const date = new Date(time?.toDate()).toLocaleDateString().split("/").join("-");
    const localTime1 = new Date(time?.toDate()).toLocaleTimeString();
 
    
    const history = useHistory();
   

    return (
        <div className="postCardHeadContainer flexBox">
            <div className="postCardHeadBox1" onClick={()=>history.push(`/profile/${uid}`)}>
                <img src={profilePic|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="pic" />
            </div>
            <div className="postCardHeadBox2">
                <div className="postCardActivity flexBox">
                    <div onClick={()=>history.push(`/profile/${uid}`)}><strong>{`${first_name} ${last_name}`}</strong></div>
                    {activity&&<div><span>{activity}</span></div>} 
                </div>
                
                <div><span>{`${localTime.join(" ")}, ${localTime1}`}</span></div> 
            </div>
            <div className="postCardHeadBox3 flexBox">
                <DotsIcon onClick={()=>setEditSection(!editSection)}/>
                {editSection&&<EditBox/>}
                {/* author===uid */}
            </div>
           
        </div>
    )
}

export default PostCardHead

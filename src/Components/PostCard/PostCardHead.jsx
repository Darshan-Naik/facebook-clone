import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"
import { useHistory } from 'react-router';
import EditBox from './EditBox';
import { useSelector } from 'react-redux';

function PostCardHead({first_name,last_name,profilePic,time,author,activity,title,postEditFunction,image}) {

    const [editSection,setEditSection]=React.useState(false);
    const {uid} = useSelector(store=>store.auth.user);

    let localTime = new Date(time?.toDate()).toString().split(" ");
    localTime.length=4;
    const localTime1 = new Date(time?.toDate()).toLocaleTimeString();
    
    const handleEditSection=()=>{
        setEditSection(false);
    }
 
    const history = useHistory();
   

    return (
        <div className="postCardHeadContainer flexBox">
            <div className="postCardHeadBox1" onClick={()=>history.push(`/profile/${author}`)}>
                <img src={profilePic|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="pic" />
            </div>
            <div className="postCardHeadBox2">
                <div className="postCardActivity flexBox">
                    <div onClick={()=>history.push(`/profile/${author}`)}><strong>{`${first_name} ${last_name}`}</strong></div>
                    {activity&&<div><span>{activity}</span></div>} 
                </div>
                
                <div><span>{`${localTime.join(" ")}, ${localTime1}`}</span></div> 
            </div>
            <div className="postCardHeadBox3 flexBox">
                <DotsIcon onClick={()=>setEditSection(!editSection)}/>
                {author===uid&&editSection&&<EditBox handleEditSection={handleEditSection} first_name={first_name} last_name={last_name} profilePic={profilePic} title={title} {...postEditFunction} image={image}/>}
                {/* author===uid */}
            </div>
           
        </div>
    )
}

export default PostCardHead

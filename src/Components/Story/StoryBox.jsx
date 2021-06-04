import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../../Styles/Story/Story.css";

function StoryBox({image, author}){
    const [userDetails, setUserDetails] = useState({});
    const users = useSelector(state=>state.app.users);
    

    useEffect(()=>{
        const user = users.filter((el)=>el.uid===author)
        //console.log("o",users, author, user)
        setUserDetails(user[0])
    },[users])
    return (
        <div style={{backgroundImage: `url("${image}")`}} className="mainImgContainer">
            <img className="imageMainContainer" src={userDetails?.profilePic} alt="" />
            <p className="pMainTag">{userDetails?.first_name+" "+userDetails?.last_name}</p>
        </div>)
}

export default StoryBox
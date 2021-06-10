import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { database } from '../../Firebase/firebase';
import "../../Styles/Story/Story.css";
import StoryContainerSkeleton from './StorySkeleton/StoryContainerSkeleton';

function StoryBox({image, author}){
    const [userDetails, setUserDetails] = useState(null);
    useEffect(()=>{
            const unsubscribe = database.collection("users").doc(author)
            .onSnapshot((doc) => {
                setUserDetails(doc.data());              
            });
            return () => {
                unsubscribe();
            }
    },[])

    return userDetails?(
        <div style={{backgroundImage: `url("${image}")`}} className="mainImgContainer">
            <img className="imageMainContainer" src={userDetails?.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png' } alt="" />
            <p className="pMainTag">{userDetails?.first_name+" "+userDetails?.last_name}</p>
        </div>):(
            <StoryContainerSkeleton />
        )
}

export default StoryBox
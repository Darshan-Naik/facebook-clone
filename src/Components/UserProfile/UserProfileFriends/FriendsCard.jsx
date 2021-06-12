import React, { useEffect, useState } from 'react'
import { ReactComponent as ThreeDots } from "../../../Icons/dots.svg";
import { Link } from "react-router-dom";
import "../../../Styles/UserProfile/UserProfileFriendsPage.css";
import { database } from '../../../Firebase/firebase';
import FriendsCardSkeleton from "./Skeleton/FriendsCardSkeleton";

function FriendsCard({friendId, alternativePath}) {

    const [unfriendOption, setUnfriendOption] = useState(false);
    const [unfriendModalVisibility, setUnfriendModalVisibility] = useState(false);
    
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        database.collection('users').doc(friendId).get()
        .then(res => {
            setUserDetails(res.data());
        })
    }, [friendId])
    
    return userDetails ? (
        <div className="friendsCardBox flexBox">
            <Link to={`${alternativePath}/${userDetails.uid}`}>
                <div className="friendsProfilePicCover">
                    <img className="fiendsProfilePic" src={userDetails.profilePic} alt={userDetails.first_name}/>
                </div>
            </Link>
            <div className="friendsCardNamePlateBox">
                <Link to={`${alternativePath}/${userDetails.uid}`}>
                    {userDetails.first_name}
                </Link>
            </div>
            <div className="friendsCardThreeDotsBox flexBox">
                <ThreeDots />
            </div>
        </div>
    ) : (
        <FriendsCardSkeleton />
    )
}

export default FriendsCard

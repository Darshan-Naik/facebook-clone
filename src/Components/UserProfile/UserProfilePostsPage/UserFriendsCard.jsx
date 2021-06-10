import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { database } from '../../../Firebase/firebase';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from 'react-redux';

function UserFriendsCard({friendId}) {
    const [userDetails, setUserDetails] = useState(null);

    const dark = useSelector( state => state.theme.dark );

    useEffect(() => {
        database.collection('users').doc(friendId).get()
        .then(res => {
            setUserDetails(res.data());
        })
    }, [friendId])

    return userDetails ? (
        <div className="flexBox postsPageUserFriendsBox">
            <Link className="postsPageUserFriendsLink" to={`/profile/${userDetails.uid}`}>
                <img className="postsPageFriendsImage" src={userDetails.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt={`${userDetails.first_name}`}/>
            </Link>
            <Link className="postsPageUserFriendsNamePlate" to={`/profile/${userDetails.uid}`}>
                {`${userDetails.first_name} ${userDetails.last_name}`}
            </Link>
        </div>
    ) : (
        <SkeletonTheme color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"}>    
            <div className="flexBox postsPageUserFriendsBox">
                <div className="postsPageUserFriendsLink" >
                    <Skeleton style={{borderRadius: "6px"}} width="100%" height="100%" />
                </div>
                <div className="postsPageUserFriendsNamePlate" ></div>
            </div>
        </SkeletonTheme>
    )
}

export default UserFriendsCard

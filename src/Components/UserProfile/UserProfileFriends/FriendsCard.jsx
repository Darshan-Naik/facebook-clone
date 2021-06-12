import React, { useEffect, useState } from 'react'
import { ReactComponent as ThreeDots } from "../../../Icons/dots.svg";
import { Link } from "react-router-dom";
import "../../../Styles/UserProfile/UserProfileFriendsPage.css";
import { database } from '../../../Firebase/firebase';
import FriendsCardSkeleton from "./Skeleton/FriendsCardSkeleton";
import { shallowEqual, useSelector } from 'react-redux';
import UnfriendModal from "../UserProfileHome/UnfriendModal";

function FriendsCard({ friendId, alternativePath, userProfileDetails }) {

    const [unfriendOption, setUnfriendOption] = useState(false);
    const [unfriendModalVisibility, setUnfriendModalVisibility] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    
    const { uid } = useSelector( state => state.auth.user, shallowEqual );

    const handleUnfriendModalVisibility = (e) => {
        if( e ) {
            e.stopPropagation();
        }
        setUnfriendModalVisibility(!unfriendModalVisibility);
        setUnfriendOption(false);
    };

    const handleUnfriendOption = (e) => {
        if( e ) {
            e.stopPropagation();
        }

        setUnfriendOption(!unfriendOption);
    }

    window.addEventListener('click', () => {
        setUnfriendModalVisibility(false);
    });

    
    const handleUnfriend = () => {
        database.collection('users').doc(userDetails.uid).collection('friends').doc(uid).delete();
        database.collection('users').doc(uid).collection('friends').doc(userDetails.uid).delete();

        setUnfriendModalVisibility(false);
    }

    useEffect(() => {
        database.collection('users').doc(friendId).get()
        .then(res => {
            setUserDetails(res.data());
        })
    }, [friendId])
    
    return userDetails ? (
        <React.Fragment>
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
                <div className="friendsCardThreeDotsBox flexBox" onClick={handleUnfriendOption}>
                    <ThreeDots />
                </div>
                {
                    userProfileDetails.uid === uid && unfriendOption && (
                        <div className="friendsCardUnfriendOptionContainer">
                            <div className="unfriendOptionBox flexBox" onClick={handleUnfriendModalVisibility}>
                                <img className="unfriendOptionBoxImage" src={process.env.PUBLIC_URL + '/Images/cancel_request_icon.png'} alt="plus"/>
                                <span className="unfriendOptionBoxNamePlate">Unfriend</span>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                unfriendModalVisibility && <UnfriendModal handleUnfriend={handleUnfriend} handleUnfriendModalVisibility={handleUnfriendModalVisibility} {...userDetails} />
            }
        </React.Fragment>
    ) : (
        <FriendsCardSkeleton />
    )
}

export default FriendsCard

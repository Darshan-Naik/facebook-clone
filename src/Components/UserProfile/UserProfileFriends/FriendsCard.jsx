import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { database } from '../../../Firebase/firebase';
import useVisibility from '../../../Hooks/useVisibility';
import { ReactComponent as ThreeDots } from "../../../Icons/dots.svg";
import "../../../Styles/UserProfile/UserProfileFriendsPage.css";
import UnfriendModal from "../UserProfileHome/UnfriendModal";
import FriendsCardSkeleton from "./Skeleton/FriendsCardSkeleton";

function FriendsCard({ friendId, alternativePath, userProfileDetails, lastClickedId, handleLastClickedId }) {

    const [unfriendOption, setUnfriendOption] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const [unfriendModalVisibility, toggleUnfriendModalVisibility] = useVisibility();

    const { uid } = useSelector(state => state.auth.user, shallowEqual);

    const handleToggleUnfriendOption = (e) => {
        toggleUnfriendModalVisibility(e);
        setUnfriendOption(false)
    }

    const handleUnfriendOption = (e) => {
        if (e) {
            e.stopPropagation();
        }

        handleLastClickedId(friendId)
        if (unfriendOption && friendId === lastClickedId) {
            setUnfriendOption(false);
        } else {
            setUnfriendOption(true);
        }
    }

    const handleUnfriend = () => {
        database.collection('users').doc(userDetails.uid).collection('friends').doc(uid).delete();
        database.collection('users').doc(uid).collection('friends').doc(userDetails.uid).delete();

        toggleUnfriendModalVisibility(false);
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
                        <img className="fiendsProfilePic" src={userDetails.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt={userDetails.first_name} />
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
                    userProfileDetails.uid === uid && friendId === lastClickedId && unfriendOption && (
                        <div className="friendsCardUnfriendOptionContainer">
                            <div className="unfriendOptionBox flexBox" onClick={handleToggleUnfriendOption}>
                                <img className="unfriendOptionBoxImage" src={process.env.PUBLIC_URL + '/Images/cancel_request_icon.png'} alt="plus" />
                                <span className="unfriendOptionBoxNamePlate">Unfriend</span>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                unfriendModalVisibility && <UnfriendModal handleUnfriend={handleUnfriend} toggleUnfriendModalVisibility={toggleUnfriendModalVisibility} {...userDetails} />
            }
        </React.Fragment>
    ) : (
        <FriendsCardSkeleton />
    )
}

export default FriendsCard

import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { database } from '../../Firebase/firebase';

function SenderFriendCard({ receiverId }) {

    const [sentFriendRequestDetails, setSentFriendRequestDetails] = useState(null);

    const uid = useSelector(state => state.auth.user.uid);
    const dark = useSelector(state => state.theme.dark);

    const handleCancelRequest = () => {
        database.collection('users').doc(sentFriendRequestDetails.uid).collection('friendRequests').doc(`${sentFriendRequestDetails.uid}${uid}`).delete();
        database.collection('users').doc(uid).collection('sentRequests').doc(`${sentFriendRequestDetails.uid}${uid}`).delete();
    }

    useEffect(() => {
        database.collection('users').doc(receiverId).get()
            .then(res => {
                setSentFriendRequestDetails(res.data());
            });
    }, [receiverId]);

    return sentFriendRequestDetails ? (
        <div className="flexBox senderFriendCardMainContainer">
            <div className="flexBox">
                <Link className="senderProfilePicCover" to={`/profile/${sentFriendRequestDetails.uid}`}>
                    <img className="senderProfilePicImage" src={sentFriendRequestDetails.profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt={sentFriendRequestDetails.first_name} />
                </Link>
            </div>
            <div className="senderProfileNamePlateCover flexBox">
                <Link className="senderProfileNamePlate" to={`/profile/${sentFriendRequestDetails.uid}`}>
                    {`${sentFriendRequestDetails.first_name} ${sentFriendRequestDetails.last_name}`}
                </Link>
            </div>
            <div className="flexBox userProfileNavButton addToStoryContainer" onClick={handleCancelRequest}>
                <img className="userProfileNavButtonIcons userProfileNavButtonIconsFilter" src={process.env.PUBLIC_URL + '/Images/cancel_request_icon.png'} alt="plus" />
                <span>Cancel Request</span>
            </div>
        </div>
    ) : (
        <SkeletonTheme color={dark ? "#202020" : "#dadada"} highlightColor={dark ? "#444" : "#f3efef"}>
            <div className="flexBox senderFriendCardMainContainer">
                <div className="flexBox">
                    <div className="senderProfilePicCover" >
                        <Skeleton style={{ borderRadius: "50%", marginTop: "5px" }} width="100%" height="100%" />
                    </div>
                </div>
                <div className="senderProfileNamePlateCover flexBox">
                    <div className="senderProfileNamePlate">
                        <Skeleton width="100px" />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default SenderFriendCard

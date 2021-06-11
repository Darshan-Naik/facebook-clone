import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { database } from '../../Firebase/firebase';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

function FriendsPageCard({ senderId }) {
    
    const [senderDetails, setSenderDetails] = useState(null);
    
    const dark = useSelector( state => state.theme.dark );
    const uid = useSelector( state => state.auth.user.uid )

    const handleAcceptFriendRequest = () => {
        let time = new Date();

        database.collection('users').doc(senderDetails.uid).collection('friends').add({ friendId: uid, time });
        database.collection('users').doc(uid).collection('friends').add({ friendId: senderDetails.uid, time });
        database.collection('users').doc(senderDetails.uid).collection('sentRequests').doc(`${uid}${senderDetails.uid}`).delete();
        database.collection('users').doc(uid).collection('friendRequests').doc(`${uid}${senderDetails.uid}`).delete();

        const payload = {
            author: uid,
            isRead: false,
            tag: `friend`,
            action: `accepted your friend request.`,
            time: new Date()
        }
        database.collection('users').doc(senderDetails.uid).collection('notifications').add(payload);
    };

    const handleDeleteFriendRequest = () => {
        database.collection('users').doc(senderDetails.uid).collection('sentRequests').doc(`${uid}${senderDetails.uid}`).delete();
        database.collection('users').doc(uid).collection('friendRequests').doc(`${uid}${senderDetails.uid}`).delete();
    }
    
    useEffect(() => {
        database.collection('users').doc(senderId).get()
        .then(res => {
            setSenderDetails(res.data());
        });
    }, [senderId]);

    return senderDetails ? (
        <div className="flexBox senderDetailsContainer">
            <div className="senderProfilePicCover">
                <Link to={`/friends/${senderId}`}>
                    <img className="senderProfilePic" src={senderDetails.profilePic || process.env.PUBLIC_URL + "/Images/userProfile_icon.png"} alt="profilePic"/>
                </Link>
            </div>
            <div className="flexBox senderDetailsBox">
                <Link className="senderDetailsLink" to={`/friends/${senderId}`}>
                    <p>{senderDetails.first_name}</p>
                </Link>
                <div className="flexBox senderDetailsButtons">
                    <button onClick={handleAcceptFriendRequest}>Confirm</button>
                    <button onClick={handleDeleteFriendRequest}>Delete</button>
                </div>
            </div>
        </div>
    ) : (
        <SkeletonTheme color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"}>
            <div className="flexBox senderDetailsContainer">
                <div className="senderProfilePicCover">
                    <Skeleton style={{borderRadius: "50%"}} width="100%" height="100%" />
                </div>
                <div className="flexBox senderDetailsBox">
                    <Link className="senderDetailsLink" to={`/friends/${senderId}`}>
                        <Skeleton style={{borderRadius: "50px"}} width="80px" />
                    </Link>
                    <div className="flexBox senderDetailsButtons"></div>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default FriendsPageCard

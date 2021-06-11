import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ThreeDots } from "../../../Icons/dots.svg";
import { Link } from "react-router-dom";
import FriendsCard from "./FriendsCard";
import UserProfileFriendsPageSkeleton from "./Skeleton/UserProfileFriendsPageSkeleton";
import "../../../Styles/UserProfile/UserProfileFriendsPage.css";
import { shallowEqual, useSelector } from 'react-redux';

function UserProfileFriendsPage({ forceRefresh, userFriends, alternativePath, userProfileDetails }) {

    const { uid } = useSelector( state => state.auth.user, shallowEqual );

    useEffect(forceRefresh, []);
    
    return userFriends ? (
        <div className="userFriendsPageMainContainer">
            <div className="userFriendsPageContainer">
                <div className="flexBox userFriendsPageHeaderBox">
                    <h1 className="userFriendsPageHeaderTitle">Friends</h1>
                    {
                        userProfileDetails.uid === uid && (
                            <React.Fragment>
                                <div className="flexBox">
                                    <Link className="friendsPageHeaderLinks" to="/friends/new">
                                        Friend Requests
                                    </Link>
                                    <Link className="friendsPageHeaderLinks" to="/friends/new">
                                        Find Friends
                                    </Link>
                                    <div className="userProfileNavDotsBox flexBox">
                                        <ThreeDots />
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }
                </div>
                {
                    userFriends.length > 0 ? (
                        <div className="flexBox friendsCardMainContainer">
                            {
                                userFriends.map( el => {
                                    return (
                                        <div key={el.friendId} className="friendsCardMainBox">
                                            <FriendsCard {...el} alternativePath={alternativePath} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div style={{marginTop: "10px"}}>
                            <h1>You have no friends to show</h1>
                        </div>
                    )
                }
            </div>
        </div>
    ) : (
        <UserProfileFriendsPageSkeleton userFriends={userFriends} />
    )
}

export default UserProfileFriendsPage

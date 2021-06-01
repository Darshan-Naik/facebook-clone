import React from 'react';
import UserProfilePageHeader from "../UserProfileHome/UserProfilePageHeader";
import UserProfileNavBar from "../UserProfileHome/UserProfileNavBar";

const UserProfileFriendsPage = ({forceRefresh}) => {
    return (
        <div>
            <UserProfilePageHeader forceRefresh={forceRefresh} />
            <UserProfileNavBar />
        </div>
    )
}

export default UserProfileFriendsPage

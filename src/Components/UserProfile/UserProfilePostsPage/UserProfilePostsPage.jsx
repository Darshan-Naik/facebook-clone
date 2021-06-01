import React from 'react';
import UserProfilePageHeader from "../UserProfileHome/UserProfilePageHeader";
import UserProfileNavBar from "../UserProfileHome/UserProfileNavBar";

const UserProfilePostsPage = ({forceRefresh}) => {
    return (
        <div>
            <UserProfilePageHeader forceRefresh={forceRefresh} />
            <UserProfileNavBar />
        </div>
    )
}

export default UserProfilePostsPage

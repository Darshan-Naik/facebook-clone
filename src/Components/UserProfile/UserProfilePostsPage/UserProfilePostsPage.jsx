import React, { useEffect } from 'react';
import UserProfilePostsPageIntro from "./UserProfilePostsPageIntro";
import UserProfilePostsPagePosts from "./UserProfilePostsPagePosts";
import "../../../Styles/UserProfile/UserProfilePostsPage.css";

const UserProfilePostsPage = ({forceRefresh, alternativePath, userProfileDetails, userFriends}) => {
    
    useEffect(forceRefresh, []);

    return (
        <div className="postsPageMainContainer">
            <div className="postsPageIntroComponentContainer scroll"> 
                <UserProfilePostsPageIntro userFriends={userFriends} userProfileDetails={userProfileDetails} alternativePath={alternativePath} />
            </div>
            <div className="postsPagePostsComponentContainer scroll">
                <UserProfilePostsPagePosts userProfileDetails={userProfileDetails} />
            </div>
        </div>
    )
}

export default UserProfilePostsPage

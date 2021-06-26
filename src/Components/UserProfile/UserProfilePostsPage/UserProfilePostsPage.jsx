import React, { useEffect } from 'react';
import "../../../Styles/UserProfile/UserProfilePostsPage.css";
import UserProfilePostsPageIntro from "./UserProfilePostsPageIntro";
import UserProfilePostsPagePosts from "./UserProfilePostsPagePosts";

function UserProfilePostsPage({ forceRefresh, alternativePath, userProfileDetails, userFriends }) {

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

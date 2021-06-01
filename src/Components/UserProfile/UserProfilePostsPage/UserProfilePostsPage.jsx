import React, { useEffect } from 'react';
import UserProfilePostsPageIntro from "./UserProfilePostsPageIntro";
import UserProfilePostsPagePosts from "./UserProfilePostsPagePosts";
import "../../../Styles/UserProfile/UserProfilePostsPage.css";

const UserProfilePostsPage = ({forceRefresh}) => {
    
    useEffect(forceRefresh, []);

    return (
        <div className="postsPageMainContainer flexBox">
            <UserProfilePostsPageIntro />
            <UserProfilePostsPagePosts />
        </div>
    )
}

export default UserProfilePostsPage

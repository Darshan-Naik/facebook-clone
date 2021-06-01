import React from 'react';
import { Switch, Route } from "react-router-dom";
import UserProfilePostsPage from "../Components/UserProfile/UserProfilePostsPage/UserProfilePostsPage";
import UserProfilePageHeader from "../Components/UserProfile/UserProfileHome/UserProfilePageHeader";
import UserProfileNavBar from "../Components/UserProfile/UserProfileHome/UserProfileNavBar";
import UserProfileAboutPage from "../Components/UserProfile/UserProfileAbout/UserProfileAboutPage";
import UserProfileFriendsPage from "../Components/UserProfile/UserProfileFriends/UserProfileFriendsPage";

function UserProfileRouter({ path, forceRefresh, refresh }) {
    return (
        <React.Fragment>
            <UserProfilePageHeader forceRefresh={forceRefresh} />
            <UserProfileNavBar alternativePath={path} refresh={refresh} />
            <Switch>
                <Route path={`${path}/:user_name`} exact>
                    <UserProfilePostsPage forceRefresh={forceRefresh} />
                </Route>
                <Route  path={`${path}/:user_name/about`}>
                    <UserProfileAboutPage forceRefresh={forceRefresh} />
                </Route>
                <Route  path={`${path}/:user_name/friends`}>
                    <UserProfileFriendsPage forceRefresh={forceRefresh} />
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default UserProfileRouter

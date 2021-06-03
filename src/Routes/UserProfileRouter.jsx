import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import UserProfilePostsPage from "../Components/UserProfile/UserProfilePostsPage/UserProfilePostsPage";
import UserProfilePageHeader from "../Components/UserProfile/UserProfileHome/UserProfilePageHeader";
import UserProfileNavBar from "../Components/UserProfile/UserProfileHome/UserProfileNavBar";
import UserProfileAboutPage from "../Components/UserProfile/UserProfileAbout/UserProfileAboutPage";
import UserProfileFriendsPage from "../Components/UserProfile/UserProfileFriends/UserProfileFriendsPage";
import {database} from "../Firebase/firebase";
import { useSelector } from 'react-redux';

function UserProfileRouter({ path, forceRefresh, refresh }) {

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const { userId } = useParams();

    const { docID } = useSelector(state => state.auth.user)
    console.log(docID);
    
    useEffect(() => {

        if( userId ) {
            const unsubscribe = database.collection("users").doc(docID)
            .onSnapshot((doc) => {
                setUserData(doc.data());
                setIsLoading(false);
            });

            return () => {
                unsubscribe();
            }
        }

    }, [])

    return userId ? (
        <React.Fragment>
            {
                isLoading ? <div>Loading...</div> : (
                    <React.Fragment>
                        <UserProfilePageHeader currentUser={`${userData.first_name} ${userData.last_name}`} userProfileDetails={userData} forceRefresh={forceRefresh} />
                        <UserProfileNavBar currentUser={`${userData.first_name} ${userData.last_name}`} alternativePath={path} userProfileDetails={userData} refresh={refresh} />
                        <Switch>
                            <Route path={`${path}/${userData.uid}`} exact>
                                <UserProfilePostsPage userProfileDetails={userData} alternativePath={path} forceRefresh={forceRefresh} />
                            </Route>
                            <Route  path={`${path}/${userData.uid}/about`}>
                                <UserProfileAboutPage forceRefresh={forceRefresh} />
                            </Route>
                            <Route  path={`${path}/${userData.uid}/friends`}>
                                <UserProfileFriendsPage forceRefresh={forceRefresh} />
                            </Route>
                        </Switch>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    ) : (
        <div>
            select user 
        </div>
    )
}

export default UserProfileRouter

// db.collection("users").doc(docUpdateId).update({key: value})
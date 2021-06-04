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
    const [userFriends, setUserFriends] = useState([]);
    const { userId } = useParams();

    useEffect(() => {

        if( userId ) {
            const unsubscribe1 = database.collection("users").doc(userId)
            .onSnapshot((doc) => {
                setUserData(doc.data());
                setIsLoading(false);
            });

            const unsubscribe2 = database.collection("users").doc(userId).collection('friends')
            .onSnapshot(res=>{
                const friends = res.docs.map(doc=>doc.data())
                setUserFriends(friends);
            });

            return () => {
                unsubscribe1();
                unsubscribe2();
            }
        }

    }, [])

    return userId ? (
        <React.Fragment>
            {
                isLoading ? <div>Loading...</div> : (
                    <React.Fragment>
                        <UserProfilePageHeader currentUser={userData.uid} userProfileDetails={userData} userFriends={userFriends} forceRefresh={forceRefresh} coverPhoto={userData.coverPic} />
                        <UserProfileNavBar currentUser={userData.uid} alternativePath={path} userFriends={userFriends} userProfileDetails={userData} refresh={refresh} />
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
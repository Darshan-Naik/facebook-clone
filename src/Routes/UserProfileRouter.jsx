import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import UserProfilePostsPage from "../Components/UserProfile/UserProfilePostsPage/UserProfilePostsPage";
import UserProfilePageHeader from "../Components/UserProfile/UserProfileHome/UserProfilePageHeader";
import UserProfileNavBar from "../Components/UserProfile/UserProfileHome/UserProfileNavBar";
import UserProfileFriendsPage from "../Components/UserProfile/UserProfileFriends/UserProfileFriendsPage";
import {database} from "../Firebase/firebase";
import UserProfilePageHeaderSkeleton from "../Components/UserProfile/UserProfileHome/UserProfileHomeSkeleton/UserProfilePageHeaderSkeleton";
import UserProfileNavBarSkeleton from "../Components/UserProfile/UserProfileHome/UserProfileHomeSkeleton/UserProfileNavBarSkeleton";

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

    }, [userId])

    return userId ? (
        <React.Fragment>
            {
                isLoading ? (
                    <React.Fragment>
                        <div style={{height:"93.66vh"}}>
                            <UserProfilePageHeaderSkeleton />
                            <UserProfileNavBarSkeleton />
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <UserProfilePageHeader currentUser={userData.uid} userProfileDetails={userData} userFriends={userFriends} forceRefresh={forceRefresh} coverPhoto={userData.coverPic} />
                        <UserProfileNavBar currentUser={userData.uid} alternativePath={path} userFriends={userFriends} userProfileDetails={userData} refresh={refresh} />
                        <Switch>
                            <Route path={`${path}/${userData.uid}`} exact>
                                <UserProfilePostsPage userProfileDetails={userData} userFriends={userFriends} alternativePath={path} forceRefresh={forceRefresh} />
                            </Route>
                            <Route  path={`${path}/${userData.uid}/friends`}>
                                <UserProfileFriendsPage userFriends={userFriends} forceRefresh={forceRefresh} />
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
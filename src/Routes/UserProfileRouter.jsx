import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams } from "react-router-dom";
import UserProfilePostsPage from "../Components/UserProfile/UserProfilePostsPage/UserProfilePostsPage";
import UserProfilePageHeader from "../Components/UserProfile/UserProfileHome/UserProfilePageHeader";
import UserProfileNavBar from "../Components/UserProfile/UserProfileHome/UserProfileNavBar";
import UserProfileFriendsPage from "../Components/UserProfile/UserProfileFriends/UserProfileFriendsPage";
import {database} from "../Firebase/firebase";
import UserProfilePageHeaderSkeleton from "../Components/UserProfile/UserProfileHome/Skeleton/UserProfilePageHeaderSkeleton";
import UserProfileNavBarSkeleton from "../Components/UserProfile/UserProfileHome/Skeleton/UserProfileNavBarSkeleton";
import FriendsPageSideBar from "../Components/FriendsPage/FriendsPageSideBar";
import {ReactComponent as StatePeople} from  "../Icons/states_people.svg";
import "../Styles/FriendsPage/FriendsPage.css";

function UserProfileRouter({ path, forceRefresh, refresh }) {

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [userFriends, setUserFriends] = useState([]);
    const { userId } = useParams();
    const { profileId } = useParams();

    useEffect(() => {
        setIsLoading(true);

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
        
        if( profileId !== "new" ) {
            const unsubscribe1 = database.collection("users").doc(profileId)
            .onSnapshot((doc) => {
                setUserData(doc.data());
                setIsLoading(false);
            });
    
            const unsubscribe2 = database.collection("users").doc(profileId).collection('friends')
            .onSnapshot(res=>{
                const friends = res.docs.map(doc=>doc.data())
                setUserFriends(friends);
            });
    
            return () => {
                unsubscribe1();
                unsubscribe2();
            }
        }

    }, [userId, profileId])

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
                            <Route  path={`${path}/${userData.uid}/friends`} exact>
                                <UserProfileFriendsPage alternativePath={path} userProfileDetails={userData} userFriends={userFriends} forceRefresh={forceRefresh} />
                            </Route>
                        </Switch>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    ) : (
        <React.Fragment>
            <div className="flexBox">
                <div className="friendsPageSideBarMainContainer scroll">
                    <FriendsPageSideBar forceRefresh={forceRefresh} />
                </div>
                <div className="friendsProfileData scroll">
                    {
                        profileId !== "new" ? isLoading ? (
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
                                    <Route  path={`${path}/${userData.uid}/friends`} exact>
                                        <UserProfileFriendsPage userProfileDetails={userData} userFriends={userFriends} alternativePath={path} forceRefresh={forceRefresh} />
                                    </Route>
                                </Switch>
                            </React.Fragment>
                        ) : (
                            <div className="friendsPageWelcomeContainer">
                                <div className="friendsPageWelcomeBox">
                                    <StatePeople/>
                                    <h2>Select people's names to preview their profile.</h2>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserProfileRouter
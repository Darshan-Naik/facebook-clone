import React from 'react';
import { useHistory } from "react-router-dom";
import { database } from '../../Firebase/firebase';
import checkActive from '../../Utils/checkActive';
import SideBarContent from '../SideBar/SideBarContent';
import ActiveContactsSkeleton from '../SideBar/Skeleton/ActiveContactsSkeleton';

function FriendsCard({ friendId }) {
    const [activeState, setActiveState] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState(null);

    const history = useHistory()

    React.useEffect(() => {
        const unsubscribe = database.collection("users").doc(friendId)
            .onSnapshot((doc) => {
                setUserDetails(doc.data());
            });

        return () => {
            unsubscribe();
        }
    }, [])

    React.useEffect(() => {
        if (userDetails?.activeStatus) {
            if (checkActive(userDetails?.activeStatus) === "Active Now") {
                setActiveState(true);
            } else {
                setActiveState(false);
            }
        }

    }, [userDetails?.activeStatus])

    return userDetails ? (
        <div className="flexBox sideBarContentLink" onClick={() => history.push(window.innerWidth < 992 ? `/profile/${friendId}` : `/friends/${friendId}`)} >
            <SideBarContent label={`${userDetails?.first_name} ${userDetails?.last_name}`} src={userDetails?.profilePic} active={activeState} />
        </div>
    ) : (
        <div className="flexBox sideBarContentLink">
            <ActiveContactsSkeleton />
        </div>
    )
}

export default FriendsCard

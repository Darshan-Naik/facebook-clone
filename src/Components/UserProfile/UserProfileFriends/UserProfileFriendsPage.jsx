import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import friendsList from '../../../Utils/friendsList';

function UserProfileFriendsPage({ forceRefresh, userFriends }) {

    const [userFriendsList, setUserFriendsList] = useState([]);
    const { users } = useSelector( state => state.app );

    console.log(userFriendsList);
    
    useEffect(() => {
        forceRefresh();
        setUserFriendsList( friendsList( users, userFriends ) )
    }, []);

    return (
        <div>
            from friends
        </div>
    )
}

export default UserProfileFriendsPage

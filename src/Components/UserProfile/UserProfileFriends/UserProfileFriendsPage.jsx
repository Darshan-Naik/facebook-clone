import React, { useEffect } from 'react';

function UserProfileFriendsPage({ forceRefresh }) {

    useEffect(forceRefresh, [])

    return (
        <div>
            from friends
        </div>
    )
}

export default UserProfileFriendsPage

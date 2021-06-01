import React, { useEffect } from 'react';

function UserProfileAboutPage ({forceRefresh}) {

    useEffect(forceRefresh, [])

    return (
        <div>
            from  about
        </div>
    )
}

export default UserProfileAboutPage

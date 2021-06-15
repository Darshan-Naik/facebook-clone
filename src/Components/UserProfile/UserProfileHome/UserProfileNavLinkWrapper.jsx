import React from 'react'
import { useHistory, Link } from 'react-router-dom'

function UserProfileNavLinkWrapper ({ path, children, extraClass }) {
    const history = useHistory();
    const { location } = history
    
    return (
        <Link to={path} className={location.pathname === path ? `userProfileNavMenuName active ${extraClass}` : `userProfileNavMenuNameBox userProfileNavMenuName ${extraClass}`}>
            {children}
        </Link>
    )
}

export default UserProfileNavLinkWrapper

import React from 'react'
import { useHistory, Link } from 'react-router-dom'

const UserProfileNavLinkWrapper = ({ path, children, extraClass }) => {
    const history = useHistory();
    const { location } = history
    
    return (
        <Link to={path} className={location.pathname === path ? `userProfileNavMenuName active` : `userProfileNavMenuNameBox userProfileNavMenuName ${extraClass}`}>
            {children}
        </Link>
    )
}

export default UserProfileNavLinkWrapper

import React from 'react'
import { useHistory, Link } from 'react-router-dom'

const UserProfileNavLinkWrapper = ({ path, children }) => {
    const history = useHistory();
    const { location } = history
    
    return (
        <Link to={path} className={location.pathname === path ? `userProfileNavMenuName active` : `userProfileNavMenuNameBox userProfileNavMenuName`}>
            {children}
        </Link>
    )
}

export default UserProfileNavLinkWrapper

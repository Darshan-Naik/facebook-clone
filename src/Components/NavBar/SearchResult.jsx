import React from 'react'
import { useSelector } from 'react-redux'
import SearchResultCard from './SearchResultCard'
function SearchResult({query,handleSearchResultBoxVisibility}) {
    const users = useSelector(store=>store.app.users)
    const result = users.filter(user=>`${user.first_name} ${user.last_name}`.toLowerCase().includes(query.toLowerCase()));
    return (
        <div className="searchResultContainer flexBox scroll" onClick={(e)=>e.stopPropagation()}>
            {!result.length?(<div className="emptyResult">
                    <p>No users found</p>
            </div>) : null}
            {result.map(user=><SearchResultCard key={user.uid} handleSearchResultBoxVisibility={handleSearchResultBoxVisibility} {...user}/>)}
        </div>
    )
}

export default SearchResult

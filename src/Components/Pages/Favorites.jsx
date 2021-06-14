import React from 'react'
import { useSelector } from 'react-redux';
import FavoritesCard from './FavoritesCard'; 

function Favorites({handleRefresh}) {
    const favorites = useSelector(store=>store.auth.favorites)
    React.useEffect(handleRefresh,[]);
    return favorites.length? (
        <div className="videoPostContainer scroll">
            {favorites.map(el=><FavoritesCard key={el.postId} {...el}/>)}
            
        </div>
    ):(
        <div className="pageNotFound flexBox">
            <img src={process.env.PUBLIC_URL + '/Images/sadFace.png'} alt="icon" />
            <h1>You not have any favorite posts.</h1>

        </div>
    )
}

export default Favorites

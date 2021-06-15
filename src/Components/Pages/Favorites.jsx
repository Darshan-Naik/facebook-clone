import React from 'react'
import { useSelector } from 'react-redux';
import FavoritesCard from './FavoritesCard'; 
import SideBar from '../SideBar/SideBar';
function Favorites({handleRefresh}) {
    const [activePostId,setActivePostId]=React.useState(null);
    const favorites = useSelector(store=>store.auth.favorites)
    React.useEffect(handleRefresh,[]);
    return (
        <div className="videoMainContainer flexBox">
                <div className="mainLeftSidebarContainer">
                    <SideBar />
                </div>         
              
            {    favorites.length? (   <div className="videoPostContainer scroll">
                {favorites.map(el=><FavoritesCard key={el.postId} activePostId={activePostId} setActivePostId={setActivePostId} {...el}/>)}
                </div>):(
        <div className="pageNotFound flexBox">
            <img src={process.env.PUBLIC_URL + '/Images/sadFace.png'} alt="icon" />
            <h1>You don't have any favorite posts.</h1>

        </div>
    )}
            </div>
    )
}

export default Favorites

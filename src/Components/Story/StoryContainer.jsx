import React, { useEffect, useState } from 'react';
import "../../Styles/Story/Story.css";
import "../../App.css";
import { useSelector } from 'react-redux';
import filterFriends from '../../Utils/filterFriends';

function StoryContainer(){
    const posts = useSelector(store=>store.posts.posts);
    const {user, friends} = useSelector(store=>store.auth)
    const {users} = useSelector( state => state.app );
    const [peopleSuggested, setPeopleSuggested] = useState([]);
    console.log("p",peopleSuggested);
    const [updated, setUpdated] = useState([]);

    useEffect(() => {
        setPeopleSuggested( filterFriends( users, friends ) )  
        //console.log("U", user)
    }, [users])

    var imagePosts = [];
    for(var i=0, j=0; i<posts.length && j<5; i++){
        if(posts[i].hasOwnProperty('image')){
            imagePosts.push(posts[i]);
            j++;
        }
    }
    return (
        <div className="storyMainContainer flexBox">
            {imagePosts.map((imgPos)=>(<div style={{backgroundImage: `url("${ imgPos.image }")`}} className="mainImgContainer" key={imgPos.id}>
                {/* <img className="imageMainContainer" src={imgPos.image} alt="" /> */}
                {peopleSuggested.forEach(element => {
                    if(element.uid==imgPos.author){
                        console.log(element.first_name+" "+element.last_name)
                    }
                })}
            </div>))}
        </div>
    )
}

export default StoryContainer;
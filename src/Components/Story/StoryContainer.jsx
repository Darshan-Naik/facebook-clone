import React, { useEffect } from 'react';
import "../../Styles/Story/Story.css";
import "../../App.css";
import { useSelector } from 'react-redux';

function StoryContainer(){
    const posts = useSelector(store=>store.posts.posts);
    console.log(posts)
    // useEffect(()=>{
    //     console.log("P",posts)
    // },[posts])
    var imagePosts = [];
    for(var i=0; i<posts.length; i++){
        if(posts[i].hasOwnProperty('image')){
            imagePosts.push(posts[i]);
        }
    }
    return (
        <div className="storyMainContainer flexBox">
            {imagePosts.map((imgPos)=>(<div key={imgPos.id} style={{marginBottom: "0", maxWidth:"130px", maxHeight: "170px"}}>
                <img className="imageMainContainer" src={imgPos.image} alt="" />
                <p className="pMainTag">Soumyadri Das</p>
            </div>))}
        </div>
    )
}

export default StoryContainer;
import React from 'react'
import SideBar from "../../Components/SideBar/SideBar";
import PostCard from '../PostCard/PostCard';
import ActiveContactSideBar from "../SideBar/ActiveContactSideBar";
import "../../Styles/Home/Home.css"
import NewPost from '../NewPost/NewPost';
import { database } from '../../Firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../Redux/Posts/actions';
function Home() {
    const dispatch = useDispatch()
    const posts = useSelector(store=>store.posts.posts)
    React.useEffect(()=>{
        database.collection("posts").orderBy("time","desc").onSnapshot(res=>{
            const newPosts = res.docs.map(doc=>({id:doc.id,...doc.data()}))
            dispatch(getPosts(newPosts))
        })
    },[])
    return (
        <div className="MainContainer">
            <div className="mainLeftSidebarContainer scroll">
                <SideBar />
            </div>         
          
            <div className="mainPostsContainer scroll">
                <NewPost />
                {posts.map((post)=><PostCard key={post.id} {...post}/>)}

            </div>
            <div className="mainRightSidebarContainer scroll">
                 <ActiveContactSideBar />
            </div>
            
        </div>
    )
}

export default Home

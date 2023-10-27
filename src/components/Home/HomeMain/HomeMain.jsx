import "./HomeMain.css"
import Post from "../Post/Post"
import FilterComponent from "../FilterComponent/FilterComponent";
import TrendingCategories from "../TrendingCategories/TrendingCategories";
import PostInput from "../PostInput/PostInput";
import { useState, useEffect } from "react";
import postData from "../../../utils/postData";
import { fetchPostsRoute } from "../../../utils/APIRoutes";
import Spinner from "../../Spinner/Spinner";
import Notification from "../../Notification/Notification";


const trendingCategories = [
    { name: 'Travel', postCount: 3500 },
    { name: 'Foodie', postCount: 2800 },
    { name: 'Fashion', postCount: 4200 },
    { name: 'Photography and other items', postCount: 1900 },
    { name: 'Travel', postCount: 3500 },
    { name: 'Foodie', postCount: 2800 },
    { name: 'Fashion', postCount: 4200 },
    { name: 'Photography and other items', postCount: 1900 },
    { name: 'Travel', postCount: 3500 },
    { name: 'Foodie', postCount: 2800 },
    { name: 'Fashion', postCount: 4200 },
    { name: 'Photography and other items', postCount: 1900 },
    { name: 'Travel', postCount: 3500 },
    { name: 'Foodie', postCount: 2800 },
    { name: 'Fashion', postCount: 4200 },
    { name: 'Photography and other items', postCount: 1900 },
    // Add more trending categories as needed
];


const HomeMain = () => {
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [posts, setPosts] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [showNotification, setShowNotification] = useState(false);


    const triggerNotification = (message) => {
        if(!message){
            message="Posted Successfully";
        }
        setShowNotification(false);
        setNotificationMessage(message);
        setShowNotification(true);
    }

    const hideCreatePost = (message) => {
        setShowCreatePost(false);
        triggerNotification(message);
    }

    const fetchPostsAPI = async (reqBody) => {
        console.log(reqBody);
        const result = await postData(fetchPostsRoute, reqBody);
        // conso
        setPosts(result.posts);
        setLoadingPosts(false);
        // console.log("RESULT OF FETCH POSTS:")
        // console.log(result);
    }
    useEffect(() => {
        fetchPostsAPI({
            filters: "all",
            interests: "all",
            categories: []
        });
    }, [])
    return (
        <div className="home-container">
            {showNotification ? <Notification message={notificationMessage} /> : null}

            <div className="filters">
                <FilterComponent notificationCallback={triggerNotification} callback={fetchPostsAPI} />
            </div>
            {loadingPosts ? <Spinner /> : <div className="posts-container">
                {showCreatePost ? <PostInput callback={hideCreatePost} /> : null}
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>}


            <div className="trending-container">
                <div className="create-post-container">
                    <div className="create-post-button" onClick={() => { setShowCreatePost(true) }}>
                        CREATE A POST
                    </div>
                </div>
                <TrendingCategories trendingCategories={trendingCategories} />
            </div>
        </div>
    )
}
export default HomeMain
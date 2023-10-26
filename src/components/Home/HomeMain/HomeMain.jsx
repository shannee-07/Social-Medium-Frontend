import "./HomeMain.css"
import Post from "../Post/Post"
import FilterComponent from "../FilterComponent/FilterComponent";
import TrendingCategories from "../TrendingCategories/TrendingCategories";
import PostInput from "../PostInput/PostInput";
import { useState, useEffect } from "react";
import postData from "../../../utils/postData";
import { fetchPostsRoute } from "../../../utils/APIRoutes";
import Spinner from "../../Spinner/Spinner";


const samplePosts = [
    {
        id: 1,
        avatarImage: 'URL_TO_AVATAR_1',
        username: 'user1',
        fullName: 'User One',
        caption: 'This is the first post.',
        imageSrc: 'URL_TO_IMAGE_1',
        category: 'Health & Fitness',
        likes: ['shannee', 'lorem', 'sd', 'asdf', 'asdf', 'sdlfk'],
        dislikes: ['sdkf', 'sdf', 'sdlk'],
        comments: ['dsk']
    },
    {
        id: 2,
        avatarImage: 'URL_TO_AVATAR_1',
        username: 'user1',
        fullName: 'User One',
        caption: 'This is the first post.',
        imageSrc: 'URL_TO_IMAGE_1',
        category: 'Health & Fitness',
        likes: ['d', 'lorem', 'sd', 'asdf', 'asdf', 'sdlfk'],
        dislikes: ['sdkf', 'shannee', 'sdlk'],
        comments: ['dsk']
    },
    {
        id: 3,
        avatarImage: 'URL_TO_AVATAR_1',
        username: 'user1',
        fullName: 'User One',
        caption: 'This is the first post.',
        imageSrc: 'URL_TO_IMAGE_1',
        category: 'Health & Fitness',
        likes: ['shanngee', 'lorem', 'sd', 'asdf', 'asdf', 'sdlfk'],
        dislikes: ['sdkf', 'sdf', 'sdlk'],
        comments: ['dsk']
    },
    // Add more posts as needed
];


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
    const hideCreatePost = () => {
        setShowCreatePost(false);
    }

    useEffect(() => {
        const apiCall = async () => {
            const result = await postData(fetchPostsRoute, {});
            setPosts(result.posts);
            setLoadingPosts(false);
            console.log("RESULT OF FETCH POSTS:")
            console.log(result);
        }
        apiCall();
    }, [])
    return (
        <div className="home-container">
            <div className="filters">
                <FilterComponent />
            </div>
            {loadingPosts ? <Spinner /> : <div className="posts-container">
                <div className="create-post-button" onClick={() => { setShowCreatePost(true) }}>
                    CREATE A POST
                </div>
                {showCreatePost ? <PostInput callback={hideCreatePost} /> : null}
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>}


            <div className="trending-container">
                <TrendingCategories trendingCategories={trendingCategories} />
            </div>
        </div>
    )
}
export default HomeMain
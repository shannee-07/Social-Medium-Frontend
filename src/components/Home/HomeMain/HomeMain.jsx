import "./HomeMain.css"
import Post from "../Post/Post"
import FilterComponent from "../FilterComponent/FilterComponent";

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
        id: 1,
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


const HomeMain = () => {
    return (
        <div className="home-container">
            <div className="filters">
                <FilterComponent/>
            </div>
            <div className="posts-container">
                {samplePosts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    )
}
export default HomeMain
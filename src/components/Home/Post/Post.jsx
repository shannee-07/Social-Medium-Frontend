import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa';
import './Post.css';
import Cookies from 'js-cookie';

const Post = (props) => {
    const { authorAvatar, authorUsername, authorName, caption, imageUrl, category, likes, dislikes, comments } = props.post
    const [likeClass, setLikeClass] = useState('like-button')
    const [dislikeClass, setDisikeClass] = useState('dislike-button')
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const likePost = async () => {
        setLiked(true);
        setDisliked(false);
    }
    const dislikePost = async () => {
        setLiked(false);
        setDisliked(true);
    }

    useEffect(async () => {
        const myUsername = await Cookies.get("username");
        console.log(likes.includes(myUsername));
        console.log(likes)
        console.log(myUsername)
        if (likes.includes(myUsername)) {
            setLiked(true);
        }
        if (dislikes.includes(myUsername)) {
            setDisliked(true);
        }
    }, [])
    return (
        <div className={`post`}>
            <div className="post-header">
                <div className="post-profile-photo">
                    <img src={authorAvatar} alt="User Avatar" className="avatar" />
                </div>
                <div className="user-info">
                    <h3>{authorName}</h3>
                    <p>@{authorUsername}</p>
                </div>
            </div>
            <p className="post-caption">{caption}</p>
            <p className='category-text'>{category}</p>
            <div className="post-image-container">
                <img src={imageUrl} alt="Post Image" className="post-image" />
            </div>
            <div className="post-actions">

                <div className="post-elements">
                    <button className={`${liked ? "like-button-liked" : "like-button"} icon-button`}>
                        <FaThumbsUp /> Like
                    </button>
                    <div className="counts">({likes.length})</div>
                </div>
                <div className="post-elements">
                    <button className={`${disliked ? "dislike-button-disliked" : "dislike-button"} icon-button`}>
                        <FaThumbsDown /> Dislike
                    </button>
                    <div className="counts">({dislikes.length})</div>

                </div>
                <div className="post-elements">
                    <button className="comment-button icon-button">
                        <FaComment /> Comment
                    </button>
                    <div className="counts">({comments.length})</div>

                </div>
            </div>
        </div>
    );
};

export default Post;

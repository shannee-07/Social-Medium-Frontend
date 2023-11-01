import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaComment,FaTelegramPlane } from 'react-icons/fa';
import './Post.css';
import Cookies from 'js-cookie';
import { likePostRoute, dislikePostRoute } from '../../../utils/APIRoutes';
import postData from '../../../utils/postData';
import Comments from '../Comments/Comments';
import { useNavigate } from 'react-router-dom';

const Post = (props) => {
    const { authorAvatar, _id, authorUsername, authorName, caption, imageUrl, category, likes, dislikes, comments } = props.post
    const forComments = props.forComments;
    const [likeClass, setLikeClass] = useState('like-button')
    const [dislikeClass, setDisikeClass] = useState('dislike-button')
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    let [likesCount, setLikesCount] = useState(likes.length);
    let [dislikesCount, setDislikesCount] = useState(dislikes.length);
    const navigate = useNavigate();
    let myUsername = Cookies.get("username");
    const likePost = async () => {
        // alert(_id)
        console.log("LIKING");
        setLiked(true);
        setDisliked(false);
        if (!likes.includes(myUsername)) {
            likes.push(myUsername);
            setLikesCount(likesCount + 1)
        }
        if (dislikes.includes(myUsername)) {
            dislikes.splice(dislikes.indexOf(myUsername), 1);
            setDislikesCount(dislikesCount - 1)
        }
        // API CALLING
        const reqBody = {
            _id: _id,
        }
        await postData(likePostRoute, reqBody);
    }
    const dislikePost = async () => {
        setLiked(false);
        setDisliked(true);
        if (!dislikes.includes(myUsername)) {
            dislikes.push(myUsername);
            setDislikesCount(dislikesCount + 1)

        }
        if (likes.includes(myUsername)) {
            likes.splice(likes.indexOf(myUsername), 1);
            setLikesCount(likesCount - 1)
        }
        // API CALLING
        const reqBody = {
            _id: _id,
        }
        await postData(dislikePostRoute, reqBody);
    }

    const toggleShowComment = () => {
        // alert("Setting commetn")
        setShowComments(!showComments);
    }

    useEffect(async () => {
        const myUsername = Cookies.get("username");
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
                    <div className="name-div">
                        <h3 className='post-author-name' onClick={()=>{
                            navigate(`/profile/${authorUsername}`)
                        }}>{authorName}</h3>
                        <div className='category-text'>({category})</div>
                    </div>
                    <p>@{authorUsername}</p>
                </div>
            </div>

            <p className="post-caption">{caption}</p>
            <hr style={{ border: '1px solid gray' }} />
            {imageUrl ? <>
                <div className="post-image-container">
                    <hr style={{ border: '1px solid gray' }} />
                    <img src={imageUrl} alt="Post Image" className="post-image" />
                </div>
            </> : null}

            <div className="post-actions">

                <div onClick={likePost} className="post-elements">
                    <button className={`${liked ? "like-button-liked" : "like-button"} icon-button`}>
                        <FaThumbsUp /> <span className='post-elements-text' >Like</span>
                    </button>
                    <div className="counts">({likesCount})</div>
                </div>
                <div onClick={dislikePost} className="post-elements">
                    <button className={`${disliked ? "dislike-button-disliked" : "dislike-button"} icon-button`}>
                        <FaThumbsDown /> <span className='post-elements-text' >Dislike</span>
                    </button>
                    <div className="counts">({dislikesCount})</div>

                </div>
                <div onClick={toggleShowComment} className="post-elements">
                    <button className="comment-button icon-button">
                        <FaComment /> <span className='post-elements-text' >Comment</span>
                    </button>
                    <div className="counts">({comments.length})</div>
                </div>
                <div className="post-elements">
                    <button className="comment-button icon-button">
                        <FaTelegramPlane  /> 
                        <span className='post-elements-text' >Send</span>
                    </button>
                    <div style={{color:"#002c44"}} className="counts">{" "}</div>
                </div>
            </div>
            {showComments ? <>
                {/* <hr style={{ border: '1px solid gray' }} /> */}
                <Comments post={props.post} />
            </> : null}
        </div>
    );
};

export default Post;

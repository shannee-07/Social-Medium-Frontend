import React, { useEffect, useState } from 'react';
import './Comments.css';
import { addCommentRoute, fetchUserDetailsRoute, fetchCommentsRoute } from '../../../utils/APIRoutes';
import postData from '../../../utils/postData';
import getData from '../../../utils/getData';
import Cookies from 'js-cookie';
import loadingIcon from "../../../assets/Loading_icon.gif";
import dateTimeConverter from '../../../utils/dateTimeConverter';
import { useNavigate } from 'react-router-dom';


const Comments = (props) => {
    const { _id, comments } = props.post;
    console.log(comments);
    const [postComments, setComments] = useState(comments);
    const [newComment, setNewComment] = useState("");

    const addCommentAPI = async () => {
        const reqBody = {
            postId: _id,
            comment: newComment.trim(),
            timestamp: Date.now().toString()
        }
        const response = await postData(addCommentRoute, reqBody);
        // if (response.success) {
        //     console.log("comment api success");
        // }
    }



    const handleCommentSubmit = () => {
        const myName = Cookies.get("name");
        const myUsername = Cookies.get("username");
        if (newComment.trim() !== "") {
            const newCommentObj = {
                name: Cookies.get("name"), // Replace with the actual username
                comment: newComment.trim(),
                imageUrl: Cookies.get("avatarImage"), // Replace with the user's photo URL
                timestamp: Date.now().toString(),
                username: Cookies.get("username")
            };

            // Add the new comment to the list of comments
            setComments([...postComments, newCommentObj]);
            console.log(comments);

            // Clear the comment input
            setNewComment("");

            // API Request:
            addCommentAPI();
        }
    };

    return (
        <div className="comments-container">
            <h2>Comments</h2>
            {postComments.length > 0 && postComments.map((comment, index) => {
                return <Comment comment={comment} key={index} />
            })}
            <div className="comment-input">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => {
                        setNewComment(e.target.value);
                        if (e.target.value.trim().length > 0) {
                            document.getElementById("")
                        }
                    }}
                />
                <button className={`${newComment.trim().length > 0 ? "visible-element" : "invisible-element"}`} onClick={handleCommentSubmit}>Comment</button>
            </div>
        </div>
    );
};


const Comment = ({ comment }) => {
    // console.log(comment);
    const [image, setImage] = useState(loadingIcon);
    const [dateTime, setDateTime] = useState({date:"",time:""});
    const navigate =useNavigate();


    const fetchUserDetailsAPI = async () => {
        if(comment.username===Cookies.get("username")){
            setImage(Cookies.get("avatarImage"))
        }
        const response = await getData(`${fetchUserDetailsRoute}/${comment.username}`);
        if (response.success) {
            setImage(response.imageUrl);
        }
    }
    useEffect(() => {
        setDateTime(dateTimeConverter(comment.timestamp))
        fetchUserDetailsAPI();
    }, [])


    return <div className="comment" >
        <div style={{ margin: "0px" }} className="comment-user-photo">
            <img style={{ margin: "0px" }} src={image} alt={comment.username} className="user-photo" />
        </div>
        <div className="comment-content">
            <span className="comment-username" onClick={()=>{
                navigate(`/profile/${comment.username}`)
            }}>{comment.name}</span>
            <p className="comment-text">{comment.comment}</p>
            <span className="comment-timestamp">{dateTime.time}{" "}{dateTime.date}</span>
        </div>
    </div>
}

export default Comments;

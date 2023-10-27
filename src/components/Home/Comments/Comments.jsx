import React, { useState } from 'react';
import './Comments.css';

const sampleComments = [
    {
        username: "priya",
        comment: "This is an awesome post!",
        photo: "https://live.staticflickr.com/4914/32166835718_b81b8a96a4_c.jpg",
        timestamp: Date.now(),
    },
    {
        username: "alia",
        comment: "Great content! Keep it up!",
        photo: "https://nangiphotos.com/wp-content/uploads/2021/07/Bollywood-Actress-Nude-Photo-7.jpg",
        timestamp: Date.now() - 3600000, // 1 hour ago
    },
    {
        username: "anna",
        comment: "Great content! Keep it up!",
        photo: "https://pinkheartmovies.xyz/wp-content/uploads/2022/10/Goddess-Anna-Episode-40__DONE.png",
        timestamp: Date.now() - 3600000, // 1 hour ago
    },
    // Add more sample comments here
];

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format the date and time
};

const Comments = () => {
    const [comments, setComments] = useState(sampleComments);
    const [newComment, setNewComment] = useState("");

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            // Create a new comment object with the current date
            const newCommentObj = {
                username: "YourUsername", // Replace with the actual username
                comment: newComment,
                photo: "https://via.placeholder.com/50", // Replace with the user's photo URL
                timestamp: Date.now(),
            };

            // Add the new comment to the list of comments
            setComments([...comments, newCommentObj]);

            // Clear the comment input
            setNewComment("");
        }
    };

    return (
        <div className="comments-container">
            <h2>Comments</h2>
            {comments.map((comment, index) => (
                <div className="comment" key={index}>
                    <div style={{margin: "0px"}} className="comment-user-photo">
                        <img style={{margin: "0px"}}  src={comment.photo} alt={comment.username} className="user-photo" />
                    </div>
                    <div className="comment-content">
                        <span className="comment-username">{comment.username}</span>
                        <p className="comment-text">{comment.comment}</p>
                        <span className="comment-timestamp">{formatDate(comment.timestamp)}</span>
                    </div>
                </div>
            ))}
            <div className="comment-input">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>Comment</button>
            </div>
        </div>
    );
};

export default Comments;

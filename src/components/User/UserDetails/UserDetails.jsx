import React, { useEffect, useState } from 'react';
import './UserDetails.css'; // Import the CSS file
import LoadingOverlay from '../../LoadingOverlay/LoadingOverlay';
import Cookies from 'js-cookie';
import postData from '../../../utils/postData';
import { uploadImageRoute, changeProfilePhotoRoute, fetchProfileDetailsRoute } from '../../../utils/APIRoutes';
import axios from "axios";
import getData from '../../../utils/getData';
import { FaUserCheck, FaUserPlus, FaUserClock } from "react-icons/fa";


const UserDetails = ({ callback, user }) => {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    // const [user, setUser] = useState({});
    const [selectedImage, setSelectedImage] = useState(
        user.avatarImage
    );
    let isMyProfile= false;
    if(user.username === Cookies.get("username")){
        isMyProfile=true;
    }

    const imageChange = async (e) => {
        setLoading(true);
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const formData = new FormData();
        formData.append("image", selectedFile);

        const result = await axios.post(uploadImageRoute, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (result.data.success) {
            const reqBody = {
                imageUrl: result.data.imageUrl
            }
            const response = await postData(changeProfilePhotoRoute, reqBody);
            if (response.success) {
                
                Cookies.set("avatarImage", result.data.imageUrl)
                setSelectedImage(result.data.imageUrl);
                setLoading(false);
            } else {
                alert('Failed to update profile photo');
            }
        } else {
            alert('Failed to update profile picture');
        }
        setLoading(false);
    }



    return (
        <>
            {loading ? <LoadingOverlay /> : <div className="profile-container">

                <div className="profile-header">
                    <div className="user-avatar-container">
                        <div className="circular-avatar">
                            <img src={selectedImage} alt="User Avatar" />
                        </div>
                        <br />
                        {isMyProfile ? <div className="">
                            <form >
                                <label class="custom-file-upload">
                                    <input
                                        filename={file}
                                        onChange={imageChange}
                                        type="file"
                                        accept=".jpeg, .jpg, .png"
                                    />
                                    Change Profile
                                </label>
                            </form>
                        </div> : null}
                    </div>
                    <div className="profile-details">
                        <div className="user-name-container">
                            <h3 className='details-element name'>{user.name}</h3>
                            {isMyProfile?null:user.isFriend ?
                                < FaUserCheck className='user-type-icon' size={20} />
                                : user.reqSent ?
                                    < FaUserClock className='user-type-icon' size={20} />
                                    : < FaUserPlus className='user-type-icon' size={20} />}
                        </div>
                        <p className='details-element username'>@{user.username}</p>
                        <p className='details-element posts-count'>{user.postsCount} Posts</p>
                    </div>
                    {/* <div className="edit-buttons">
                        <button className="edit-button">Edit Details</button>

                    </div> */}
                </div>
                <div className="category-section">
                    <div className="category-heading">
                        <h3>Interests:</h3>
                        {isMyProfile ? <button onClick={callback} className="edit-button">Edit Categories</button> : null}
                    </div>
                    <ul>
                        {user && user.categories && user.categories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                    </ul>
                </div>
            </div>}

        </>
    );
};



export default UserDetails;

import React, { useEffect, useState } from 'react';
import './UserDetails.css'; // Import the CSS file
import LoadingOverlay from '../../LoadingOverlay/LoadingOverlay';
import Cookies from 'js-cookie';
import postData from '../../../utils/postData';
import { uploadImageRoute, changeProfilePhotoRoute, fetchProfileDetailsRoute } from '../../../utils/APIRoutes';
import axios from "axios";
import getData from '../../../utils/getData';

const UserDetails = ({ callback }) => {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [selectedImage, setSelectedImage] = useState(
        Cookies.get("avatarImage")
    );

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

    const fetchDetails = async () => {
        setLoading(true);
        let details = await getData(fetchProfileDetailsRoute);
        console.log(details);
        setUser(details);
        setLoading(false);
    }
    useEffect(() => {
        fetchDetails();
    }, [])

    // const user = {
    //     username: 'exampleUser',
    //     name: 'John Doe',
    //     postsCount: 10,
    //     categories: ['Category1', 'Category2', 'Category3','Category1', 'Category2', 'Category3','Category1', 'Category2', 'Category3','Category1', 'Category2', 'Category3','Category1', 'Category2', 'Category3','Category1', 'Category2', 'Category3',],
    // };

    return (
        <>
            {loading ? <LoadingOverlay /> : <div className="profile-container">

                <div className="profile-header">
                    <div className="user-avatar-container">
                        <div className="circular-avatar">
                            <img src={selectedImage} alt="User Avatar" />
                        </div>
                        <br />
                        <div className="">
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
                        </div>
                    </div>
                    <div className="profile-details">
                        <h2 className='details-element name'>{user.name}</h2>
                        <p className='details-element username'>@{user.username}</p>
                        <p className='details-element posts-count'>{user.result} Posts</p>
                    </div>
                    <div className="edit-buttons">
                        <button className="edit-button">Edit Details</button>

                    </div>
                </div>
                <div className="category-section">
                    <div className="category-heading">
                        <h3>Interests:</h3>
                        <button onClick={callback} className="edit-button">Edit Categories</button>
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

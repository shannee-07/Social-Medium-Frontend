import React, { useState } from "react";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import Cookies from "js-cookie";
import postData from "../../utils/postData";
import { uploadImageRoute , changeProfilePhotoRoute} from "../../utils/APIRoutes";
import axios from "axios";
import "./Profile.css"

const Profile = () => {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
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
            const response = await postData(changeProfilePhotoRoute,reqBody);
            if(response.success){
                Cookies.set("avatarImage",result.data.imageUrl)
                setSelectedImage(result.data.imageUrl);
                setLoading(false);
            }else{
                alert('Failed to update profile photo');
            }
        }else{
            alert('Failed to update profile picture');
        }
        setLoading(false);
    }

    return (
        <>
            {loading?<LoadingOverlay/>:null}
            <div className="upper-container">
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
        </>
    );
};

export default Profile;

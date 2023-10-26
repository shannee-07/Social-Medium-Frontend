import React, { useState } from "react";
// import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import Cookies from "js-cookie";
import postData from "../../../utils/postData";
import { uploadImageRoute } from "../../../utils/APIRoutes";
import axios from "axios";
// import "../Styles/Profile.css";
// import "./CreatePost.css"; // Create a CSS file for styling

const CreatePost = () => {
    const [file, setFile] = useState();
    const [selectedImage, setSelectedImage] = useState(
        Cookies.get("avatarImage")
    );

    const imageChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setSelectedImage(selectedFile);

        // const formData = new FormData();
        // formData.append("image", selectedFile);

        // const result = await axios.post(uploadImageRoute, formData, {
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // });

        // if (result.data.success) {
        //     setSelectedImage(result.data.imageUrl);
        // }
    }

    return (
        <div className="upper-container">
            {/* <div className="input-image">
                <img src={selectedImage} alt="User Avatar" />
            </div> */}
            <br />
            <div className="">
                <form>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                        <input
                            filename={file}
                            onChange={imageChange}
                            type="file"
                            accept="image/*"
                            style={{display: "block"}}
                        />
                </form>
            </div>
        </div>
    );
};

export default CreatePost;

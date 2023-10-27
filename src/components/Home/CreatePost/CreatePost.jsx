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
    }

    return (
        <div className="upper-container">
            <br />
            <div className="">
                <form>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                        <input
                            filename={file}
                            onChange={imageChange}
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            style={{display: "block"}}
                        />
                </form>
            </div>
        </div>
    );
};

export default CreatePost;

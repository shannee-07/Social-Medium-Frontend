import React, { useState, useEffect } from "react";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import Cookies from "js-cookie";
import postData from "../../../utils/postData";
import { uploadImageRoute, changeProfilePhotoRoute, fetchProfileDetailsRoute } from "../../../utils/APIRoutes";
import axios from "axios";
import "./Profile.css"
import CategoryGrid from "../../CategoryGrid/CategoryGrid";
import UserDetails from "../UserDetails/UserDetails";
import getData from "../../../utils/getData";
import Post from "../../Home/Post/Post";
import { FaRegArrowAltCircleLeft ,FaUserPlus,FaUserClock} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";


const Profile = () => {
    const [file, setFile] = useState();
    const [showCategoryGrid, setShowCategoryGrid] = useState(false);
    const [user, setUser] = useState({});

    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState();

    const { username } = useParams();
    const navigate = useNavigate();

    const callbackCategoryGrid = () => {
        setShowCategoryGrid(!showCategoryGrid);
    }

    const fetchDetails = async () => {
        setLoading(true);
        let details = await getData(`${fetchProfileDetailsRoute}?username=${username}`);
        if (!details.success) {
            alert("Failed to load profile");
        }
        console.log(details);
        setUser(details);
        setSelectedImage(user.avatarImage);
        setLoading(false);
    }
    const handleArrowClick = () => {
        navigate(-1);
    }
    useEffect(() => {
        fetchDetails();
    }, [])
    return (
        <>

            {loading ? <LoadingOverlay /> : showCategoryGrid ? null :
                <div className="">
                    <div className="profile-header">
                        <FaRegArrowAltCircleLeft size={35} className="arrow-icon" onClick={handleArrowClick} />
                        <span className="header-text">User Profile</span>
                    </div>
                    <div className="main-profile-container">
                        <div className="user-details-pages">
                            <UserDetails user={user} callback={callbackCategoryGrid} />
                        </div>
                        <div className="user-posts-container">
                            {user.posts.map((post) => {
                                return <Post post={post} key={post._id} />
                            })}
                        </div>
                    </div>

                </div>

            }
            {showCategoryGrid ? <CategoryGrid  callback={callbackCategoryGrid}/> : null}

        </>
    );
};

export default Profile;

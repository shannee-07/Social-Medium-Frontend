import React, { useState, useEffect } from "react";
import "./PostInput.css"; // Import your CSS file
import { uploadImageRoute, createPostRoute } from "../../../utils/APIRoutes";
import { FaRegTimesCircle } from "react-icons/fa";
import axios from "axios";
import postData from "../../../utils/postData";
import { fetchCategoriesRoute } from "../../../utils/APIRoutes";
import LoadingOverlay from "../../LoadingOverlay/LoadingOverlay";
import Notification from "../../Notification/Notification";

const PostInput = ({ callback ,notificationCallback}) => {
  const [file, setFile] = useState()
  const [categories, setCategories] = useState([{ category: 'Loading...' }]);
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");


  const triggerNotification = (message) => {
    setShowNotification(false);
    setNotificationMessage(message);
    setShowNotification(true);
  }

  const handleCheckboxChange = () => {
    setIsPublic(!isPublic);
  };
  const hide = () => {
    callback();
  }

  const imageUpload = async () => {
    if (!file) {
      return "";
    } else {
      const formData = new FormData()
      formData.append("image", file)

      const result = await axios.post(uploadImageRoute, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      return result.data.imageUrl;
    }
  }

  const submit = async event => {
    event.preventDefault()
    // alert(selectedCategory);
    // return;
    if (!file && !description) {
      triggerNotification("Please select image or description")
      return;
    }
    setLoading(true);

    const imageUrl = await imageUpload();

    const reqBody = {
      caption: description,
      imageUrl: imageUrl,
      category: selectedCategory,
      public: isPublic
    }
    const response = await postData(createPostRoute, reqBody);
    if (response.success) {
      // notificationCallback()
      // triggerNotification()
      hide("Posted Successfully!")
    } else {
      console.log(response);
    }
    setLoading(false);
    // alert("SUCCESS");
    // console.log(response);

  }

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get(fetchCategoriesRoute);
      setCategories(result.data.categories);
      setSelectedCategory(result.data.categories[0].category);
    }
    fetchCategories();
  }, [])


  return (
    <div className={`dialog-bar open`}>
      {loading ? <LoadingOverlay /> : null}
      {showNotification ? <Notification message={notificationMessage} /> : null}

      <div className="dialog-content">
        <div className="cross-icon">
          <FaRegTimesCircle size={30} color="white" onClick={hide} />
        </div>
        <br />
        <div className="inputs">
          <form onSubmit={submit}>
            <div className="category-title">Select Post Category</div>
            <div className="category-dropdown">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => {
                  category = category.category;
                  return <option value={category}>{category}</option>
                })}
              </select>
            </div>

            <input
              filename={file}
              onChange={e => setFile(e.target.files[0])}
              type="file"
              accept=".jpeg, .jpg, .png"
              style={{ display: "block" }}
            ></input>
            <textarea onChange={e => setDescription(e.target.value)}
              name="" value={description} id="" cols="70" rows="10"></textarea>
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={handleCheckboxChange}
                  className="checkbox-input"
                />
                Post Publicly
              </label>
              <p className="checkbox-status">
                ({isPublic ? 'Post is public' : 'Post is not public'})
              </p>
            </div>
            <div className="center-button"><button type="submit">Submit</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostInput;

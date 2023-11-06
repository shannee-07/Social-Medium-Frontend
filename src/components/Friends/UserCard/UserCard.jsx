import React from 'react';
import { FaUserPlus, FaCheckCircle, } from 'react-icons/fa';
import { FaUserCheck, FaUserClock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "../../../Styles/toast.css"
import Avatar from 'react-avatar';
import './UserCard.css'; // Create a CSS file for styling
import { sendRequestRoute, addFriendRoute } from '../../../utils/APIRoutes';
import getData from '../../../utils/getData';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function UserCard({ name, username, profilePhoto, cardFor, isFriend, reqSent }) {
  // const [requestSent, setRequestSent] = useState(false);
  const [requestAccepted, setRequestAccepted] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(Cookies.get("username") === username);
  const [isMyFriend, setIsMyFriend] = useState(isFriend);
  const [requestSent, setRequestSent] = useState(reqSent);
  // const [reqSent, setReqSent] = useState(false);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const toastMessageOption = {
    position: "bottom-right",
    autoClose: 2500, // Adjust the autoClose duration as needed
    pauseOnHover: true,
    draggable: true,
    theme: "dark", // You can change the theme if you want
  };


  if (username === Cookies.get("username")) {
    return <></>
  }


  const sendRequest = async () => {

    if (cardFor === "requests") {
      acceptRequest();
      return;
    }

    const response = await getData(`${sendRequestRoute}/${username}`);
    if (response.success) {
      setRequestSent(true);
      toast.success("Request Sent Successfully", toastMessageOption);
    } else {
      if (response.errorcode === 2) {
        toast.error("Email and Password is required.", toastOptions);
        return;
      }
      console.log(response);
    }
    // const result = axios.get();
  }

  const acceptRequest = async () => {
    // alert("ACCEPTING")
    const response = await getData(`${addFriendRoute}/${username}`);
    if (response.success) {
      setRequestAccepted(true);
      setIsMyFriend(true);
      toast.success("Added Successfully", toastMessageOption);
    } else {
      console.log(response);
    }
    // const result = axios.get();
  }


  return (
    <div className="user-card">
      <div className="user-avatar circular-avatar-card">
        {/* <Avatar name={name} size="100" round={true} /> */}
        <img src={profilePhoto} className='' alt="" />
        {/* <img src="" alt="" /> */}
      </div>
      <div className="user-info" onClick={() => (navigate(`/profile/${username}`))}>
        <h2 >{name}</h2>
        <p> {username}</p>
        <a target="_blank" rel="noopener noreferrer">
          Visit Profile
        </a>
      </div>

      {isMyProfile ? null : isMyFriend ?
        < FaUserCheck className='user-type-icon' size={20} />
        : requestSent ?
          < FaUserClock className='user-type-icon' size={20} />
          : < FaUserPlus className='user-type-icon' size={20} onClick={sendRequest} />}

      {/* {cardFor === "search" ? <div className="add-friend">
        {requestSent ? <FaCheckCircle className='check-icon' /> : <FaUserPlus className='add-icon' onClick={sendRequest} />}
      </div> : null}
      {cardFor === "requests" ? <div className="add-friend">
        {requestAccepted ? <FaCheckCircle className='check-icon' /> : <FaUserPlus className='add-icon' onClick={acceptRequest} />}
      </div> : null} */}
      <ToastContainer />
    </div>
  );
}

export default UserCard;

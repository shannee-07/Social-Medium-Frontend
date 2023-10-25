import React from 'react';
import { FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import Avatar from 'react-avatar';
import './UserCard.css'; // Create a CSS file for styling
import { sendRequestRoute , addFriendRoute} from '../../../utils/APIRoutes';
import getData from '../../../utils/getData';
import { useState } from 'react';

function UserCard({ name, username, profilePhoto, cardFor }) {
  const [requestSent, setRequestSent] = useState(false);
  const [requestAccepted, setRequestAccepted] = useState(false);
  const sendRequest = async () => {
    const response = await getData(`${sendRequestRoute}/${username}`);
    if (response.success) {
      setRequestSent(true);
    } else {
      console.log(response);
    }
    // const result = axios.get();
  }
  const acceptRequest = async () => {
    // alert("ACCEPTING")
    const response = await getData(`${addFriendRoute}/${username}`);
    if (response.success) {
      setRequestAccepted(true);
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
      <div className="user-info">
        <h2>{name}</h2>
        <p> {username}</p>
        <a href={"#"} target="_blank" rel="noopener noreferrer">
          Visit Profile
        </a>
      </div>
      {cardFor === "search" ? <div className="add-friend">
        {requestSent ? <FaCheckCircle className='check-icon' /> : <FaUserPlus className='add-icon' onClick={sendRequest} />}
      </div> : null}
      {cardFor === "requests" ? <div className="add-friend">
        {requestAccepted ? <FaCheckCircle className='check-icon' /> : <FaUserPlus className='add-icon' onClick={acceptRequest} />}
      </div> : null}
    </div>
  );
}

export default UserCard;

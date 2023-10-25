import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import Avatar from 'react-avatar';
import './UserCard.css'; // Create a CSS file for styling
import axios from 'axios';
import { allUsersRoute } from '../../../utils/APIRoutes';

function UserCard({ name, username, profilePhoto }) {
  const sendRequest= async()=>{
    const result = axios.get();
  }
  return (
    <div className="user-card">
      <div className="user-avatar">
        {/* <Avatar name={name} size="100" round={true} /> */}
        <img src={profilePhoto} style={{width: 70, borderRadius: "50%"}} alt="" />
        {/* <img src="" alt="" /> */}
      </div>
      <div className="user-info">
        <h2>{name}</h2>
        <p> {username}</p>
        <a href={"#"} target="_blank" rel="noopener noreferrer">
          Visit Profile
        </a>
      </div>
      <div className="add-friend">
        <FaUserPlus className='add-icon' onClick={sendRequest} />
      </div>
    </div>
  );
}

export default UserCard;

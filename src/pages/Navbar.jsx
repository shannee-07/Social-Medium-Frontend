import React, { useState } from 'react';
import { FaHome, FaUserFriends, FaComment, FaUser, FaAngleDown, FaSignOutAlt } from 'react-icons/fa';
import '../Styles/Navbar.css';
import Chat from './Chat';
import FriendSearch from './FriendSearch';
import "../Styles/background.css"

function Navbar() {
    const [activeOption, setActiveOption] = useState('feed'); // Initialize with 'feed'

    const handleOptionClick = (option) => {
        setActiveOption(option);
    };

    return (
        <>
            <div className={`navbar ${activeOption === 'feed' ? 'active' : ''}`}>
                <ul>
                    <li>
                        <a
                            href="#feed"
                            onClick={() => handleOptionClick('feed')}
                            className={activeOption === 'feed' ? 'active' : ''}
                        >
                            <FaHome />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#friend-search"
                            onClick={() => handleOptionClick('friend-search')}
                            className={activeOption === 'friend-search' ? 'active' : ''}
                        >
                            <FaUserFriends />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#messages"
                            onClick={() => handleOptionClick('messages')}
                            className={activeOption === 'messages' ? 'active' : ''}
                        >
                            <FaComment />
                        </a>
                    </li>
                    <li className="profile-dropdown">
                        <a href="#profile" className="profile">
                            <FaUser style={{marginRight: 10}} /> <span className='user-name'>Shannee Ahirwar</span> <FaAngleDown />
                        </a>

                        <div className="dropdown-content">
                            <a className='dropdown-item' href="#my-profile">My Profile</a>
                            <a className='dropdown-item' href="#logout"> <FaSignOutAlt /> Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
            {activeOption == 'messages' ? <Chat /> : null}
            {activeOption == 'friend-search' ? <FriendSearch /> : null}
        </>
    );
}

export default Navbar;

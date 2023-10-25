import React, { useState, useEffect } from 'react';
import { FaHome, FaUserFriends, FaComment, FaUser, FaAngleDown, FaSignOutAlt } from 'react-icons/fa';
import '../Styles/Navbar.css';
import Chat from './Chat';
import FriendSearch from './FriendSearch';
import "../Styles/background.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/User/Profile';
import HomeMain from '../components/Home/HomeMain/HomeMain';

function Navbar() {
    const [activeOption, setActiveOption] = useState('feed'); // Initialize with 'feed'
    const navigate = useNavigate();
    const handleOptionClick = (option) => {
        setActiveOption(option);
    };
    const logout = () => {
        Object.keys(Cookies.get()).forEach((cookieName) => {
            Cookies.remove(cookieName);
        });
        navigate("/login");
    }

    useEffect(() => {
        if (!Cookies.get("token")) {
            navigate("/login");
        }
    }, [])

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
                            <FaHome size={30} className='dropdown-icons' />
                        </a>
                    </li>
                    <li>
                        <a
                            href="#friend-search"
                            onClick={() => handleOptionClick('friend-search')}
                            className={activeOption === 'friend-search' ? 'active' : ''}
                        >
                            <FaUserFriends size={30} className='dropdown-icons'/>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#messages"
                            onClick={() => handleOptionClick('messages')}
                            className={activeOption === 'messages' ? 'active' : ''}
                        >
                            <FaComment size={30} className='dropdown-icons' />
                        </a>
                    </li>
                    <li className="profile-dropdown">
                        <a href="#profile" className="profile">
                            <section className="profile-photo"><img src={Cookies.get("avatarImage")} /></section> <span className='user-name'>{Cookies.get("name")}</span> <FaAngleDown />
                        </a>

                        <div className="dropdown-content">
                            <a className='dropdown-item' onClick={() => setActiveOption("profile")}>My Profile</a>
                            <a className='dropdown-item' onClick={logout}> <FaSignOutAlt /> Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
            {activeOption == 'feed' ? <HomeMain /> : null}
            {activeOption == 'messages' ? <Chat /> : null}
            {activeOption == 'friend-search' ? <FriendSearch /> : null}
            {activeOption == 'profile' ? <Profile /> : null}
        </>
    );
}

export default Navbar;

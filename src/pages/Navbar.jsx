import React, { useState, useEffect } from 'react';
import { FaHome, FaBell, FaEnvelopeOpenText, FaUsers, FaAngleDown, FaSignOutAlt } from 'react-icons/fa';
import '../Styles/Navbar.css';
import Chat from './Chat';
import FriendSearch from './FriendSearch';
import "../Styles/background.css"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/User/Profile/Profile';
import HomeMain from '../components/Home/HomeMain/HomeMain';
import getData from '../utils/getData';
import { fetchAlertsRoute } from '../utils/APIRoutes';

function Navbar() {
    const [activeOption, setActiveOption] = useState('feed'); // Initialize with 'feed'
    const [showNotifications, setShowNotifications] = useState(false);
    const [newNotificationsCount, setNewNotificationsCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
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

    const fetchNotifications = async () => {
        const response = await getData(fetchAlertsRoute);
        if (response.success) {
            setNotifications(response.notifications);
            setNewNotificationsCount(response.newNotifications);
        }
    }

    useEffect(() => {
        if (!Cookies.get("token")) {
            navigate("/login");
        }
        fetchNotifications();

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
                            <div className="navbar-options">
                                <FaHome size={21} className='dropdown-icons' />
                                <div className="navbar-option-text">
                                    Home
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#friend-search"
                            onClick={() => handleOptionClick('friend-search')}
                            className={activeOption === 'friend-search' ? 'active' : ''}
                        >
                            <div className="navbar-options">
                                <FaUsers size={21} className='dropdown-icons' />
                                <div className="navbar-option-text">
                                    Friends
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#messages"
                            onClick={() => handleOptionClick('messages')}
                            className={activeOption === 'messages' ? 'active' : ''}
                        >
                            <div className="navbar-options">
                                <FaEnvelopeOpenText size={21} className='dropdown-icons' />
                                <div className="navbar-option-text">
                                    Messages
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#alerts"
                            onClick={() => {
                                // setActiveOption("alerts");
                                setShowNotifications(!showNotifications)
                            }}
                            className={activeOption === 'alerts' ? 'active' : ''}
                        >
                            <div className="navbar-options">
                                {newNotificationsCount > 0 ? <div className="new-alerts-alert">
                                    <p>{newNotificationsCount}</p>
                                </div> : null}

                                <FaBell size={21} className='dropdown-icons' />
                                <div className="navbar-option-text">
                                    Alerts
                                </div>


                            </div>
                        </a>
                    </li>
                    {showNotifications && (
                        <div className="notification-bar dark-theme">
                            {notifications.map((notification) => {
                                return (
                                    <div className="notification-item">
                                        <p>{notification.notification}</p>
                                    </div>
                                );
                            })}
                            {notifications.length === 0 ?
                                <div className="notification-item">
                                    <p>No Alerts</p>
                                </div> : null
                            }

                        </div>
                    )
                    }



                    <li className="profile-dropdown">
                        <a href="#profile" className="profile">
                            <section className="profile-photo"><img src={Cookies.get("avatarImage")} /></section> <span className='user-name'>{Cookies.get("name")}</span> <FaAngleDown />
                        </a>

                        <div className="dropdown-content">
                            <a className='dropdown-item' onClick={() => navigate(`profile/${Cookies.get("username")}`)}>My Profile</a>
                            <a className='dropdown-item' onClick={logout}> <FaSignOutAlt /> Logout</a>
                        </div>
                    </li>

                </ul>
                {/* <div style={{height:"10px"}} className="nav-space-bottom"></div> */}
            </div>
            {activeOption == 'feed' ? <HomeMain /> : null}
            {activeOption == 'messages' ? <Chat /> : null}
            {activeOption == 'friend-search' ? <FriendSearch /> : null}
            {/* {activeOption == 'profile' ? <Profile /> : null} */}
        </>
    );
}

const Alerts = () => {
    return (
        <div className="notification-bar dark-theme">
            <div className="notification-item">
                <p>New alert 1</p>
            </div>
        </div>
    )
}


export default Navbar;

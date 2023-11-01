import React from 'react';
import { FaGlobe, FaHamburger, FaTshirt, FaDumbbell, FaMobileAlt, FaCamera, FaPalette, FaFilm, FaMusic, FaBook, FaGamepad, FaCut, FaHome, FaBriefcase, FaRocket, FaRecycle, FaUsers, FaPaw, FaSun, FaPalette as Beauty, FaHeartbeat, FaFutbol, FaVoteYea, FaGraduationCap, FaPlane, FaDumbbell as FitnessChallenges, FaMobileAlt as TechReviews, FaPalette as ArtTutorials, FaFilm as MovieReviews, FaMusic as MusicRecommendations, FaBook as BookClub, FaUtensils, FaSpa, FaSeedling as Gardening, FaShoePrints as FashionTrends, FaStar as InspirationalQuotes, FaGlasses, FaLaptopCode, FaCamera as TravelPhotography, FaLeaf, FaBrain, FaMountain, FaGem, FaStar as Astrology, FaClock, FaGrinBeam as Memes } from 'react-icons/fa';
import "./CategoryGrid.css"
import { useState, useEffect } from 'react';
import { fetchInterestsRoute, updateInterestsRoute } from '../../utils/APIRoutes';
import postData from '../../utils/postData';
import getData from '../../utils/getData';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import Notification from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';


const categoryData = [
    { name: "Travel", icon: <FaGlobe />, isSelected: false },
    { name: "Food and Recipes", icon: <FaHamburger />, isSelected: false },
    { name: "Fashion and Style", icon: <FaTshirt />, isSelected: false },
    { name: "Fitness and Wellness", icon: <FaDumbbell />, isSelected: false },
    { name: "Technology", icon: <FaMobileAlt />, isSelected: false },
    { name: "Photography", icon: <FaCamera />, isSelected: false },
    { name: "Art and Design", icon: <FaPalette />, isSelected: false },
    { name: "Entertainment", icon: <FaFilm />, isSelected: false },
    { name: "Music", icon: <FaMusic />, isSelected: false },
    { name: "Books and Literature", icon: <FaBook />, isSelected: false },
    { name: "Gaming", icon: <FaGamepad />, isSelected: false },
    { name: "DIY and Crafts", icon: <FaCut />, isSelected: false },
    { name: "Home Decor", icon: <FaHome />, isSelected: false },
    { name: "Business and Entrepreneurship", icon: <FaBriefcase />, isSelected: false },
    { name: "Science and Technology News", icon: <FaRocket />, isSelected: false },
    { name: "Environment and Sustainability", icon: <FaRecycle />, isSelected: false },
    { name: "Parenting and Family", icon: <FaUsers />, isSelected: false },
    { name: "Pets and Animals", icon: <FaPaw />, isSelected: false },
    { name: "Lifestyle", icon: <FaSun />, isSelected: false },
    { name: "Beauty and Skincare", icon: <Beauty />, isSelected: false },
    { name: "Motivation and Self-Help", icon: <FaHeartbeat />, isSelected: false },
    { name: "Sports", icon: <FaFutbol />, isSelected: false },
    { name: "Politics and Current Affairs", icon: <FaVoteYea />, isSelected: false },
    { name: "Education", icon: <FaGraduationCap />, isSelected: false },
    { name: "Travel Tips and Hacks", icon: <FaPlane />, isSelected: false },
    { name: "Fitness Challenges", icon: <FitnessChallenges />, isSelected: false },
    { name: "Tech Reviews", icon: <TechReviews />, isSelected: false },
    { name: "Art Tutorials", icon: <ArtTutorials />, isSelected: false },
    { name: "Movie Reviews", icon: <MovieReviews />, isSelected: false },
    { name: "Music Recommendations", icon: <MusicRecommendations />, isSelected: false },
    { name: "Book Club", icon: <BookClub />, isSelected: false },
    { name: "Culinary Adventures", icon: <FaUtensils />, isSelected: false },
    { name: "Mindfulness and Meditation", icon: <FaSpa />, isSelected: false },
    { name: "Gardening", icon: <Gardening />, isSelected: false },
    { name: "Fashion Trends", icon: <FashionTrends />, isSelected: false },
    { name: "Inspirational Quotes", icon: <InspirationalQuotes />, isSelected: false },
    { name: "Virtual Reality (VR) and Augmented Reality (AR)", icon: <FaGlasses />, isSelected: false },
    { name: "Coding and Development", icon: <FaLaptopCode />, isSelected: false },
    { name: "Travel Photography", icon: <TravelPhotography />, isSelected: false },
    { name: "Sustainability Initiatives", icon: <FaLeaf />, isSelected: false },
    { name: "Mental Health Awareness", icon: <FaBrain />, isSelected: false },
    { name: "Hiking and Outdoors", icon: <FaMountain />, isSelected: false },
    { name: "Luxury Lifestyles", icon: <FaGem />, isSelected: false },
    { name: "Astrology and Horoscopes", icon: <Astrology />, isSelected: false },
    { name: "Productivity Hacks", icon: <FaClock />, isSelected: false },
    { name: "Memes", icon: <Memes />, isSelected: false }
];


// const interests = ["Travel Photography", "Technology", "Photography"]

const CategoryGrid = ({callback}) => {
    const [list, setList] = useState(categoryData);
    const [loading, setLoading] = useState(false);
    const [myInterests, setMyInterests] = useState([]);
    const [isElementVisible, setElementVisible] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const navigate = useNavigate();

    const handleItemClick = (name) => {
        if (myInterests.includes(name)) {
            const filteredArray = myInterests.filter((element) => element !== name);
            // console.log(filteredArray);
            setMyInterests(filteredArray);
        } else {
            setMyInterests([...myInterests, name]);
        }
    }
    const fetchInterests = async () => {
        setLoading(true);
        const result = await getData(fetchInterestsRoute);
        // console.log("API RESPONSE:==========>")
        // console.log(result);
        setMyInterests(result.interests);
        setLoading(false);

        // refreshList();
    }

    const triggerNotification = (message) => {
        setShowNotification(false);
        setNotificationMessage(message);
        setShowNotification(true);
    }
    const updateInterests = async () => {
        setLoading(true);
        const reqBody = {
            interests: myInterests
        }
        const response = await postData(updateInterestsRoute, reqBody);
        if (response.success) {
            triggerNotification('Updated Interests Successfully')
            // navigate(-1);
            callback();
        } else {
            triggerNotification('Failed to Update Interests');
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchInterests();
    }, [])
    let timer;

    useEffect(() => {
        const handleMouseMove = () => {
            setElementVisible(true);
            clearTimeout(timer);
            timer = setTimeout(() => {
                setElementVisible(false);
            }, 700);
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);

            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {showNotification ? <Notification message={notificationMessage} /> : null}
            {loading ? <LoadingOverlay /> : <>
                <div className="category-grid">
                    {list.map((category, index) => {
                        // if(category)
                        return <Category callback={handleItemClick} key={index} isSelected={myInterests.includes(category.name)} category={category} />
                    })}
                </div>
                {isElementVisible ? <div className="button-area">
                    <div className="submit-text" onClick={updateInterests}>Update Interests</div>
                </div> : null}
            </>}
        </>
    );
};


const Category = ({ callback, category, key, isSelected }) => {

    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
        callback(category.name);
    }
    useEffect(() => {
        if (isSelected) {
            setSelected(true);
        }
    }, [])

    return (
        <div key={key} className={`${selected ? "category-items-selected" : "category-items"}`} onClick={handleClick}>
            {category.icon}
            <span className="category-name">{category.name}</span>
        </div>
    )
}

export default CategoryGrid;

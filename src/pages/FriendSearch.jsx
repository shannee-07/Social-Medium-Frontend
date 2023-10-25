import React, { useState, useEffect } from 'react';
import "../Styles/FriendSearch.css"
import "../Styles/common.css"
import { FaSearchPlus } from "react-icons/fa";
import "../Styles/background.css"
import UserCard from '../components/Friends/UserCard/UserCard';
import axios from "axios";
import { searchUserRoute } from '../utils/APIRoutes';


const sampleUsers = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe123',
    email: 'john@example.com',
    profilePhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBRkXjudpdrzXCgKjwVzt3tCxgSQvq9kkwQ&usqp=CAU',
  },
  {
    id: 2,
    name: 'Alice Smith',
    username: 'alice.s',
    email: 'alice@example.com',
    profilePhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBRkXjudpdrzXCgKjwVzt3tCxgSQvq9kkwQ&usqp=CAU',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    username: 'bobj',
    email: 'bob@example.com',
    profilePhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBRkXjudpdrzXCgKjwVzt3tCxgSQvq9kkwQ&usqp=CAU',
  },
  {
    id: 4,
    name: 'Ella Brown',
    username: 'ellab',
    email: 'ella@example.com',
    profilePhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBRkXjudpdrzXCgKjwVzt3tCxgSQvq9kkwQ&usqp=CAU',
  },
  {
    id: 5,
    name: 'Chris Wilson',
    username: 'chris.wil',
    email: 'chris@example.com',
    profilePhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBRkXjudpdrzXCgKjwVzt3tCxgSQvq9kkwQ&usqp=CAU',
  },
  {
    id: 6,
    name: 'Chris Wilson',
    username: 'chris.wil',
    email: 'chris@example.com',
    profilePhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBRkXjudpdrzXCgKjwVzt3tCxgSQvq9kkwQ&usqp=CAU',
  },
  {
    id: 7,
    name: 'Chris Wilson',
    username: 'chris.wil',
    email: 'chris@example.com',
    profilePhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBRkXjudpdrzXCgKjwVzt3tCxgSQvq9kkwQ&usqp=CAU',
  },
];


function FriendSearch() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(sampleUsers);
  const [loading, setLoading] = useState(false);

  const searchUser = async (text) => {
    const result = await axios.get(`${searchUserRoute}/${text}`);
    console.log("RESULT IS")
    console.log(result.data.results);
    setSearchResults(result.data.results);
  }

  useEffect(() => {
    // Simulated API call (replace with actual API endpoint)
    const fetchFriends = async () => {
      setLoading(true);
      try {
        // Make your API request here
        // Example using fetch:
        const response = await fetch(`/api/search?query=${searchText}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call the API only if there's a non-empty search text
    if (searchText) {
      // setSearchResults([{ id: 1, name: "Iron Man" }])
      // setSearchResults(sampleUsers)
      // fetchFriends();
      searchUser(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="center-container-column ">
      <div className={`app dark-mode center-container-column`}>
        <div className="dark-mode-toggle">
          {/* <label>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          Dark Mode
        </label> */}
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for friends"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* <FaSearchPlus size={100} color='yellow'/> */}
        </div>

        <div className="search-results">
          {loading && <p>Loading...</p>}
          {!loading && searchResults.length === 0 && <p>No results found.</p>}
          {searchResults.length > 0 ?
            // <ul>

            <div>
              <div className="result-count">
                Results ({searchResults.length})
              </div>
              {searchResults.map((friend) => {
                return <UserCard key={friend.id} name={friend.name} username={friend.username} profilePhoto={friend.avatarImage} />;
              })}
            </div> : null
            // </ul>
          }
        </div>
      </div>
    </div>
  );
}

export default FriendSearch;

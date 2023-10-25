import React, { useState, useEffect } from 'react';
import "../Styles/FriendSearch.css"
import "../Styles/common.css"
import { FaSearchPlus } from "react-icons/fa";
import "../Styles/background.css"
import UserCard from '../components/Friends/UserCard/UserCard';
import axios from "axios";
import { searchUserRoute, fetchRequestsRoute } from '../utils/APIRoutes';
import getData from '../utils/getData';

function FriendSearch() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUser = async (text) => {
    const result = await axios.get(`${searchUserRoute}/${text}`);
    console.log("RESULT IS")
    console.log(result.data.results);
    setSearchResults(result.data.results);
  }

  useEffect(() => {
    // Simulated API call (replace with actual API endpoint)
    const fetchRequests = async () => {
      // setLoading(true);
      try {
        const response = await getData(fetchRequestsRoute);
        console.log(response);
        if (response.success) {
          setFriendRequests(response.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();

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
    <div className="upper-container-req">
      <div className="requests-container">
        {/* <div className="search-results"> */}
        {/* {loading && <p>Loading...</p>} */}
        {friendRequests.length === 0 && <p>No requests.</p>}
        {friendRequests.length > 0 ?
          // <ul>

          <div>
            <div className="result-count">
              Results ({friendRequests.length})
            </div>
            {friendRequests.map((friend) => {
              return <UserCard key={friend._id} name={friend.name} username={friend.username} profilePhoto={friend.avatarImage} cardFor="requests" />;
            })}
          </div> : null
          // </ul>
        }
      </div>
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
                  return <UserCard key={friend.id} name={friend.name} username={friend.username} profilePhoto={friend.avatarImage} cardFor="search" />;
                })}
              </div> : null
              // </ul>
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default FriendSearch;

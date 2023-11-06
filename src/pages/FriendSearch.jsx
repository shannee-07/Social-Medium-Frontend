import React, { useState, useEffect } from 'react';
import "../Styles/FriendSearch.css"
import "../Styles/common.css"
import { FaSearchPlus } from "react-icons/fa";
import "../Styles/background.css"
import UserCard from '../components/Friends/UserCard/UserCard';
import axios from "axios";
import { searchUserRoute, fetchRequestsRoute, allFriendsRoute } from '../utils/APIRoutes';
import getData from '../utils/getData';
import Spinner from '../components/Spinner/Spinner';

function FriendSearch() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUser = async (text) => {
    // const result = await axios.get(`${searchUserRoute}/${text}`);
    setLoading(true);
    const result = await getData(`${searchUserRoute}/${text}`);

    if (result.success) {
      console.log("RESULT IS")
      console.log(result.results);
      setSearchResults(result.results);
    } else {
      console.log("Something went wrong")
    }
    setLoading(false);

  }
  const fetchRequests = async () => {
    // setLoading(true);
    try {
      const response = await getData(fetchRequestsRoute);
      // console.log(response);
      if (response.success) {
        setFriendRequests(response.result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchFriends = async () => {
    // setLoading(true);
    try {
      const response = await getData(allFriendsRoute);
      console.log(response);
      setMyFriends(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (searchText) {
      searchUser(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  useEffect(() => {
    fetchRequests();
    fetchFriends();
  }, []);

  return (
    <div className="upper-container-req">
      <div className="requests-container">
        {/* <div className="search-results"> */}
        {/* {loading && <p>Loading...</p>} */}
        {/* {friendRequests.length === 0 && <p>No requests.</p>} */}
        {friendRequests.length > 0 ?
          // <ul>

          <div>
            <div className="result-count">
              Requests ({friendRequests.length})
            </div>
            {friendRequests.map((friend) => {
              return <UserCard key={friend._id} name={friend.name} username={friend.username} profilePhoto={friend.avatarImage} cardFor="requests" />;
            })}
          </div> : null
          // </ul>
        }


        {myFriends.length > 0 ? <div>
          <div className="result-count">
            Your Friends ({myFriends.length})
          </div>
          {myFriends.map((friend) => {
            return <UserCard key={friend._id} name={friend.name} username={friend.username} profilePhoto={friend.avatarImage} isFriend={true} reqSent={false} cardFor="requests" />;
          })}
        </div> : null}
      </div>

      <div className="center-container-column ">
        <div className={`app dark-mode center-container-column`}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for friends"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {/* <FaSearchPlus size={100} color='yellow'/> */}
          </div>

          {loading ? <Spinner /> :
            <div className="search-results">
              <div className="search-message">
                {searchText.length === 0 && searchResults.length === 0 && <p>Please Enter Text</p>}
                {!loading && searchResults.length === 0 && searchText.length !== 0 && <p>No results found.</p>}
              </div>
              {searchResults.length > 0 ?
                // <ul>

                <div>
                  <div className="result-count">
                    Results ({searchResults.length})
                  </div>
                  {searchResults.map((friend) => {
                    return <UserCard key={friend.id} name={friend.name} username={friend.username} profilePhoto={friend.avatarImage} isFriend={friend.isFriend} reqSent={friend.reqSent} cardFor="search" />;
                  })}
                </div> : null
                // </ul>
              }
            </div>}
        </div>

      </div>
    </div>
  );
}

export default FriendSearch;

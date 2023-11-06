// export const host = "https://fleximedia.onrender.com";
export const host = "http://localhost:5000";

// Auth
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;

// General
export const allFriendsRoute = `${host}/api/auth/allFriends`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const searchUserRoute = `${host}/api/auth/searchUsers`;
export const sendRequestRoute = `${host}/api/auth/sendFriendRequest`;
export const fetchRequestsRoute = `${host}/api/auth/fetchRequests`;
export const addFriendRoute = `${host}/api/auth/addFriend`;
export const uploadImageRoute = `${host}/api/files/uploadImage`;
export const fetchAlertsRoute = `${host}/api/auth/fetchAlerts`;

// Posts
export const fetchCategoriesRoute = `${host}/api/posts/fetchCategories`;
export const createPostRoute = `${host}/api/posts/createPost`;
export const fetchPostsRoute = `${host}/api/posts/fetchPosts`;
export const likePostRoute = `${host}/api/posts/likePost`;
export const changeProfilePhotoRoute = `${host}/api/auth/changeProfilePhoto`;
export const dislikePostRoute = `${host}/api/posts/dislikePost`;
export const addCommentRoute = `${host}/api/posts/addComment`;
export const fetchCommentsRoute = `${host}/api/posts/fetchComments`;

// Profile
export const fetchInterestsRoute = `${host}/api/auth/fetchInterests`;
export const fetchProfileDetailsRoute = `${host}/api/auth/fetchProfileDetails`;
export const updateInterestsRoute = `${host}/api/auth/updateInterests`;
export const fetchUserDetailsRoute = `${host}/api/auth/fetchUserDetails`;

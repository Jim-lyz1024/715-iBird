/**
 * Wrap axios calls in our own functions
 */

import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = `${BASE_URL}/routes/api`;


const USERS_URL = `${API_BASE_URL}/users`;

const CREATE_ACCOUNT_URL = `${USERS_URL}/create`;
const LOGIN_URL = `${USERS_URL}/login`;
const TOKEN_TO_USERNAME_URL = `${USERS_URL}/getUsernameFromToken`;
const SUBSTRING_USERNAME_SEARCH_URL = `${USERS_URL}/search`;
const LEVEL_UP_URL = `${USERS_URL}/levelUp`;


const FRIENDS_URL = `${API_BASE_URL}/friends`;

const GET_FRIENDS_URL = `${FRIENDS_URL}/getfriends`;
const ADD_FRIEND_URL = `${FRIENDS_URL}/addfriend`;
const REMOVE_FRIEND_URL = `${FRIENDS_URL}/removefriend`;


const TRIPS_URL = `${API_BASE_URL}/trips`;

const START_NEW_TRIP_URL = `${TRIPS_URL}/startNewTrip`;
const ADD_LOCATION_URL = `${TRIPS_URL}/addLocation`;
const GET_ACTIVE_TRIP_URL = `${TRIPS_URL}/getActiveTrip`;
const GET_INACTIVE_TRIPS_URL = `${TRIPS_URL}/getInactiveTrips`;
const GET_TRIP_BY_ID_URL = `${TRIPS_URL}/getTrip`;
const END_TRIP_URL = `${TRIPS_URL}/endTrip`;
const SUBMIT_QUIZ_URL = `${TRIPS_URL}/submitQuizResults`;



const IMAGES_URL = `${API_BASE_URL}/images`;

const UPLOAD_iMAGE_URL = `${IMAGES_URL}/upload`;
const GET_IMAGE_URL = `${IMAGES_URL}/getImage`;
const REQUEST_EXPERT_URL = `${IMAGES_URL}/requestExpertOpinion`;
const IMAGES_FOR_EXPERT_URL = `${IMAGES_URL}/imagesForExpertReview`;
const EXPERT_UPDATE_BIRD_URL = `${IMAGES_URL}/updateBirdForImage`;




const BIRDS_URL = `${API_BASE_URL}/birds`;

const GET_AII_BIRDS_URL = `${BIRDS_URL}/getAllbirds`;
const GET_MY_BIRDS_URL = `${BIRDS_URL}/getMybirds`;
const GET_USER_BIRDS_URL = `${BIRDS_URL}/getUserbirds`;
const GET_BIRD_URL = `${BIRDS_URL}/getBird`;



// user register
export const create = (username, password) => {
    return axios.post(CREATE_ACCOUNT_URL, { username, password });
}

// user login
export const login = (username, password) => {
    return axios.post(LOGIN_URL, { username, password });
}

// get username from token
export const getUsernameFromToken = (token) => {
    return axios.get(
        TOKEN_TO_USERNAME_URL,
        { headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

// get all users
export const getAllUsers = (token) => {
    return axios.get(
        USERS_URL,
        { headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

// get user information by username
export const getUserInfo = (token, username) => {
    return axios.get(
        `${USERS_URL}/${username}`,
        { headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

// get user information by username
export const searchUsernameSubstring = (token, username) => {
    return axios.get(
        `${SUBSTRING_USERNAME_SEARCH_URL}/${username}`,
        { headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

export const levelUp = (token) => {
    return axios.post(LEVEL_UP_URL, {}, {
        headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true }
    });
}

// ====================

// get all friends
export const getFriends = (token) => {
    return axios.get(
        GET_FRIENDS_URL,
        { headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

// add friend to a user
export const addFriend = (token, username) => {
    return axios.post(ADD_FRIEND_URL, { username }, {
        headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true }
    });
}

// remove a friend
export const removeFriend = (token, username) => {
    return axios.delete(REMOVE_FRIEND_URL, {
        headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true },
        data: { username }
    });
}





// =============================


export const startNewTrip = (token, isEdugaming, fitnessLevel) => {
    return axios.post(START_NEW_TRIP_URL, {
        isEdugaming: isEdugaming,
        fitnessLevel: fitnessLevel
    }, {
        headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true }
    });
}

export const addLocation = (token, latitude, longitude, timestamp) => {
    return axios.post(ADD_LOCATION_URL, { latitude, longitude, timestamp }, {
        headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true }
    });
}

export const getActiveTrip = (token) => {
    return axios.get(
        GET_ACTIVE_TRIP_URL,
        { headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

export const getInactiveTrips = (token) => {
    return axios.get(
        GET_INACTIVE_TRIPS_URL,
        { headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

export const getTripById = (token, id) => {
    return axios.get(
        `${GET_TRIP_BY_ID_URL}/${id}`,
        { headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

export const endTrip = (token) => {
    return axios.post(END_TRIP_URL, {}, {
        headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true }
    });
}

export const submitQuizResults = (token, quizResults) => {
    return axios.post(SUBMIT_QUIZ_URL, { quizResults }, {
        headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true }
    });
}


// ============================


// Upload an image
export const uploadImage = (token, imageFile, location, timestamp) => {
    const formData = new FormData();
    formData.append('photo', imageFile);
    formData.append('location', JSON.stringify(location));
    formData.append('timestamp', timestamp);

    return axios.post(UPLOAD_iMAGE_URL, formData, {
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            "ngrok-skip-browser-warning": true
        }
    });
}

// Retrieve an image by its key
export const getImageByKey = (token, key) => {
    return axios.get(
        `${GET_IMAGE_URL}/${key}`,
        { headers: { 'authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

export const requestExpertOpinion = (token, imageId) => {
    return axios.post(REQUEST_EXPERT_URL, { imageId }, {
        headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true }
    });
}

export const getImagesForExpertReview = (token) => {
    return axios.get(
        `${IMAGES_FOR_EXPERT_URL}`,
        { headers: { 'authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

export const expertUpdateBird = (token, imageId, selectedBirdId) => {
    return axios.post(EXPERT_UPDATE_BIRD_URL, { imageId, selectedBirdId }, {
        headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true }
    });
}

// ============================================

export const getAllbirds = (token) => {
    return axios.get(
        GET_AII_BIRDS_URL,
        { headers: { 'authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

export const getMybirds = (token) => {
    return axios.get(
        GET_MY_BIRDS_URL,
        { headers: { 'authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

export const getUserbirds = (token, username) => {
    return axios.get(
        `${GET_USER_BIRDS_URL}/${username}`,
        { headers: { authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}

export const getBird = (token, name) => {
    return axios.get(
        `${GET_BIRD_URL}/${name}`,
        { headers: { 'authorization': `Bearer ${token}`, "ngrok-skip-browser-warning": true } }
    );
}
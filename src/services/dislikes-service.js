/**
 * @file Axios Request service API for dislikes && tuits resource
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
    withCredentials: true
});

/**
 * Update tuit stats based on user's click event(toggles dislike button)
 * @param {string} uid Represents user that is toggling dislike button
 * @param {string} tid Represents the tuit being disliked by user
 */
export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

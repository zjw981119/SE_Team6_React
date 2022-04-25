/**
 * @file Axios Request service API for bookmarks && tuits resource
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
  withCredentials: true,
});

/**
 * Update tuit stats based on user's click event(toggles bookmark button)
 * @param {string} uid Represents user that is toggling boookmark button
 * @param {string} tid Represents the tuit being bookmarked by user
 */
export const userBookmarksTuit = (uid, tid) =>
  api
    .put(`${USERS_API}/${uid}/bookmarks/${tid}`)
    .then((response) => response.data);

/**
 * Retrieve all tuits bookmarked by user.
 * @param {string} uid Represents the login user
 */
export const findAllTuitsBookmarkedByUser = (uid) =>
  api.get(`${USERS_API}/${uid}/bookmarks`).then((response) => response.data);

export const findAllTags = (uid) =>
  api.get(`${USERS_API}/${uid}/tags/`).then((response) => response.data);

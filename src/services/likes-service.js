import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
    withCredentials: true
});

export const userLikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

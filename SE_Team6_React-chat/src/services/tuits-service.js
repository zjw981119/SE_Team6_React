import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/users`;
// http://localhost:4000
// const TUITS_API = "https://tuiter-a3-jw.herokuapp.com/tuits";
// const USERS_API = "https://tuiter-a3-jw.herokuapp.com/users";

const api = axios.create({
    withCredentials: true
});

export const findAllTuits = () =>
    api.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    api.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

// retrieve tuits posted by user
export const findTuitsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

// post tuit by user
export const createTuit = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    api.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const deleteTuitByContent = (tuit) =>
    api.delete(`${TUITS_API}/content/${tuit}/delete`)
        .then(response => response.data);
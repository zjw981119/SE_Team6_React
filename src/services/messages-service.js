import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;
const MESSAGES_API = `${BASE_URL}/messages`;

const api = axios.create({
    withCredentials: true
});

// send message by user, sender should be 'me'
export const sendMessage = (sender, receiver, msg) =>
    api.post(`${USERS_API}/${sender}/messages/${receiver}`, msg)
        .then(response => response.data);

// retrieve current user's contacts, users should be an object {sentFrom: me, sentTo: uid}
export const findAllMessages = (users) =>
    api.get(MESSAGES_API, users)
        .then(response => response.data);

// retrieve current user's contacts, uid should be 'my'
export const findAllContacts = (uid) =>
    api.get(`${MESSAGES_API}/${uid}/contacts`)
        .then(response => response.data);

// just for testing
export const deleteMsgByContent = (msg) =>
    api.delete(`${MESSAGES_API}/content/${msg}/delete`)
        .then(response => response.data);

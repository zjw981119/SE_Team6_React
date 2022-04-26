import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { host } from "../../utils/APIRoutes";
import ChatContainer from "./ChatContainer";
import Welcome from "./Welcome";
import * as service from "../../services/security-service";
import Contacts from "./Contacts";
import {findAllContacts} from "../../services/messages-service";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  /*useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
          await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
      );
    }
  }, []);*/
  useEffect(async () => {
    try {
      const user = await service.profile();
      setCurrentUser(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("addUser", currentUser._id);
    }
  }, [currentUser]);

  /*useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);*/

  // find all contacts excluding the login user
  const findContacts = () =>
      findAllContacts("my")
          .then(users => {
            setContacts(users)
          })
  useEffect(findContacts, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
      <>
        <Container>
          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
                <Welcome />
            ) : (
                <ChatContainer currentChat={currentChat} socket={socket} />
                )}
          </div>
        </Container>
      </>
  );
}

const Container = styled.div`
  height: 600px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  border-color: black;
  .container {
    height: 600px;
    width: 600px;
    background-color: white;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;



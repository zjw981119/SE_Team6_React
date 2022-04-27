import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import * as service from "../../services/security-service";
import {findAllMessages, sendMessage} from "../../services/messages-service";

export default function ChatContainer({ currentChat, socket }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(async () => {
        //const data = await service.profile();
        //setProfile(user);
        const msgs = await findAllMessages({
            sentFrom: 'me',
            sentTo: currentChat._id,
        });
        console.log(msgs)
        setMessages(msgs);
    }, [currentChat]);

    // useEffect(() => {
    //     const getCurrentChat = async () => {
    //         if (currentChat) {
    //             await JSON.parse(
    //                 localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    //             )._id;
    //         }
    //     };
    //     getCurrentChat();
    // }, [currentChat]);

    const handleSendMsg = async (msg) => {
        const loginUser = await service.profile();
        // use socket to send message to receiver
        socket.current.emit("sendMsg", {
            sentTo: currentChat._id,
            sentFrom: loginUser._id,
            msg,
        });
        // call RESTful api to send message(store data in database)
        await sendMessage('me', currentChat._id, {message: msg})

        //update msgs array for current login user
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };


    // listen to 'receiveMsg' event, store new msg sent to loginUser
    useEffect(() => {
        if (socket.current) {
            socket.current.on("receiveMsg", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    // when receive new message, update msgs array and render the page
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="chat-messages">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={message._id}>
                            <div
                                className={`message ${
                                    message.fromSelf ? "sended" : "recieved"
                                }`}
                            >

                                <div className="content" >

                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  background-color: white;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 2 rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {

    padding: 1rem 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {

        background-color: #ffffff;

        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {

        max-width: 60%;
        overflow-wrap: break-word;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0px;
        font-size: 1.1rem;
        border-radius: 1rem;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      
      color:white;
      .content {
        background-color: #1DA1F2;
      }
    }
    .recieved {
      color:black;
      justify-content: flex-start;
      .content {
        background-color: #E1E8ED;

      }
    }
  }
`;

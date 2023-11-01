import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "../ChatInput/ChatInput";
import Logout from "../Logout/Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../../../utils/APIRoutes";
import { FaEllipsisH } from "react-icons/fa";
import "./ChatContainer.css"
import dateTimeConverter from "../../../utils/dateTimeConverter";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  let displayDate = "";


  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
      timestamp: Date.now()
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
      timestamp: Date.now()
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, timestamp: Date.now().toString() });
    setMessages(msgs);
  };


  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log("Message Received");
        setArrivalMessage({ fromSelf: false, message: msg, timestamp: Date.now().toString() });
      });

      // Clean up the event handler when the component unmounts
      return () => {
        socket.current.off("msg-recieve");
      };
    }
  }, []);

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
          <div className="avatar">
            <img
              src={`${currentChat.avatarImage}`}
              alt=""
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>

        {/* <Logout /> */}
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          // console.log(messages);
          let showDate = false;
          const msgTimestamp = dateTimeConverter(message.timestamp);
          if (displayDate !== msgTimestamp.date) {
            showDate = true;
            displayDate = msgTimestamp.date;
          }

          // const date = form
          return (
            <div ref={scrollRef} key={uuidv4()}>
              {showDate ? <div className="show-date">{msgTimestamp.date}</div> : null}
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >

                <div className="content ">
                  <p>{message.message}</p>
                  <div className="msg-time-container">
                    <span className="msg-time">{msgTimestamp.time}</span>
                  </div>
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
  grid-template-rows: 10% 79% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    margin-top: 10px;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        width: 40px;
        /* You can adjust the size as needed */
        height: 40px;
        /* You can adjust the size as needed */
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f2f2f2;
        img {
          height: 3rem;
          width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
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
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        padding-bottom: 0px;
        font-size: 1.1rem;
       
        color: #001927;
        @media screen and (min-width: 720px) and (max-width: 1480px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        
        background-color: #5becff;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: #5becff;
      }
    }
  }
`;

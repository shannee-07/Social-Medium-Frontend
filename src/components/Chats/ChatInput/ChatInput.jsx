import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FaFileImage } from "react-icons/fa";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import "./style.css"

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    // <Container>
    <div className="parent-container">
      <FaFileImage size={28} className="image-send-icon"/>
      
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        {/* <div onClick={submit} className="submit-button"></div> */}
        <button type="submit">
          <IoMdSend size={23} className="button" />
        </button>
      </form>
    </div>
    // </Container>
  );
}

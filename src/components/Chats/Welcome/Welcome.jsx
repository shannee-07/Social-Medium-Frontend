import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../../assets/robot.gif";
import Logo from "../../../assets/logo.png"
import Cookies from "js-cookie";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Logo} alt="" />
      <h1>
        Welcome to <span>Live Chat!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    width: 300px;
    margin-bottom: 50px;
  }
  span {
    color: #00aaff;
  }
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as service from "../../services/security-service";
export default function Welcome() {
  const [userName, setProfile] = useState("");
  useEffect(async () => {
            const user = await service.profile();
            setProfile(user);
    }, []);
  return (
    <Container>
      <h1 style={{color: "black", fontSize: "20px"}}>Please select a chat on the left to Start messaging.</h1>
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
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

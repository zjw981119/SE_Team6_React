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
        <div className="welcome-container">
          Please select another user on the left to begin chatting.
        </div>
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
  .welcome-container {
    padding: 1.5rem;
    text-align: center;
    display:table;
    width:100%;
    height:auto;
    color:#000000;  
    font-size: 1.5rem;
  }
`;

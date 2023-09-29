import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

interface CourseCardProps {
  name: string;
  description: string;
  id: number;
}

function TestCard({ name, description, id }: CourseCardProps) {
  const navigate = useNavigate();
  return (
    <TestCardContainer>
      <TestHeader>{name}</TestHeader>
      <TestDescription>{description}</TestDescription>
      <StartTestButton
        onClick={() => {
          navigate(`${id}`);
        }}
      >
        Пройти тест
      </StartTestButton>
    </TestCardContainer>
  );
}

const TestHeader = styled.h3`
  text-align: center;
  margin-bottom: 0;
`;

const StartTestButton = styled.button`
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  background-color: #a763b891;
  width: 10vw;
  height: 30px;
  border-radius: 5px;
`;

const TestDescription = styled.p`
  width: 100%;
  height: auto;
`;

const TestCardContainer = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: rgb(235, 188, 247, 0.57);
  width: 80%;
  height: 100%;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export default TestCard;
